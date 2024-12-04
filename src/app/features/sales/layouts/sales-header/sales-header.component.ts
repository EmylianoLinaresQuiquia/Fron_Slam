import { AlertService } from './../../../../shared/services/alert.service';
import { UsuarioPost } from './../../../../api-client';
import { Component, OnInit,AfterViewInit , ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SharedService } from '../../../admin/services/shared.service';
import { IUsuarioPost } from '../../../../api-client';
import { ApiClient } from '../../../../api-client';
import { UsuarioLogin } from './../../../../api-client';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
declare const google: any;
@Component({
  selector: 'app-sales-header',
  standalone: true,
  imports: [
    SharedModule,
    NzDropDownModule,
  ],
  templateUrl: './sales-header.component.html',
  styleUrls: ['./sales-header.component.css'],
  providers: [
    ApiClient,
  ],
})
export class SalesHeaderComponent implements OnInit,AfterViewInit {
  carrito: any[] = [];
  user: any = null;

  @ViewChild('loginModal') loginModal!: ElementRef;

  usuario = {
    nombre: '',
    email: '',
    contrasena: '',
    dni: '',
    googleRegistro: false,
  };

  usuarioLogin = {
    email: '',
    contrasena: '',
    googleRegistro: false,
  };

  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;
  private failedAttempts = 0;
  private isLocked = false;

  constructor(
    private sharedService: SharedService,
    private apiClientService: ApiClient,
    public alertService:AlertService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

    this.loginForm = this.fb.group({
      nombre: ['', [Validators.required]],
      contrasena: ['', [Validators.required, Validators.minLength(5)]],
    });


  }

  ngOnInit(): void {
    this.cargarCarrito();

  }


  cargarCarrito(): void {
    const carritoActual = localStorage.getItem('carrito');
    if (carritoActual) {
      try {
        const carrito = JSON.parse(carritoActual);
        this.carrito = carrito.filter((producto: any) => producto !== null && producto?.id_producto);
      } catch (error) {
        console.error('Error al parsear el carrito:', error);
        this.carrito = [];
      }
    } else {
      this.carrito = [];
    }
  }

  eliminarProducto(index: number): void {
    this.carrito.splice(index, 1); // Elimina el producto del array
    localStorage.setItem('carrito', JSON.stringify(this.carrito)); // Actualiza localStorage
    this.carrito = [...this.carrito]; // Crear nueva referencia del array
  }


  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: '788781500500-ba71578oc93e236u8afrm6aqmh0lit26.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large' }
    );
  }

  handleCredentialResponse(response: any): void {
    try {
      const jwtToken = response.credential;
      const userInfo = this.decodeJwt(jwtToken);

      // Configura los datos del usuario
      this.usuario.nombre = userInfo.name || '';
      this.usuario.email = userInfo.email || '';
      this.usuario.contrasena = ''; // Contraseña predeterminada
      this.usuario.googleRegistro = true; // Marca que el registro proviene de Google

      // Realiza el registro automáticamente
      this.registrarUsuario();
    } catch (error) {
      this.alertService.showAlert('error', 'Error al procesar la respuesta de Google.');
      console.error(error);
    }
  }

  decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  registrarUsuario(): void {
    const usuarioPost = UsuarioPost.fromJS(this.usuario);

    this.apiClientService.registrar(usuarioPost).subscribe(
      (response) => {
        this.alertService.showAlert('success', 'Usuario registrado exitosamente');
        console.log('Respuesta del servidor:', response);

        // Limpia los datos de usuario si es necesario
        this.usuario = {
          nombre: '',
          email: '',
          contrasena: '',
          dni: '',
          googleRegistro: false,
        };
      },
      (error) => {
        let errorMessage = 'Ocurrió un error inesperado.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else if (error.error && error.error.Message) {
          errorMessage = error.error.Message;
        } else if (error.message) {
          errorMessage = error.message;
        }

        this.alertService.showAlert('error', 'Error al registrar el usuario: ' + errorMessage);
        console.error(error);
      }
    );
  }


   // Método para iniciar sesión
   iniciarSesion(): void {
    console.log('Se ejecutó iniciarSesion');

    if (this.isLocked) {
        this.alertService.showAlert('warning', 'La cuenta está bloqueada. Intenta nuevamente más tarde.');
        return;
    }

    if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        return;
    }

    this.loading = true;

    const credentials = new UsuarioLogin({
        email: this.loginForm.value.nombre,
        contrasena: this.loginForm.value.contrasena,
        googleLogin: false,
    });

    this.apiClientService.iniciarSesion(credentials).subscribe({
        next: (response) => {
            this.loading = false;
            this.failedAttempts = 0;

            if (response?.mensaje?.startsWith('Inicio de sesión exitoso')) {
                console.log('Inicio de sesión exitoso:', response);

                // Guardar el usuario completo en una cookie
                this.cookieService.set('user', JSON.stringify(response), { path: '/', expires: 7 });

                this.alertService.showAlert('success', `Bienvenido, ${response.nombre}.`);

                // Cierra el modal
                this.cerrarModal();
            } else {
                this.alertService.showAlert('warning', 'Inicio de sesión exitoso, pero no se encontraron detalles.');
            }
        },
        error: (error) => {
            this.loading = false;
            this.failedAttempts++;

            console.error('Error al iniciar sesión:', error);

            if (this.failedAttempts >= 3) {
                this.isLocked = true;
                setTimeout(() => {
                    this.isLocked = false;
                    this.failedAttempts = 0;
                }, 30000);
                this.alertService.showAlert('danger', 'Demasiados intentos fallidos. Cuenta bloqueada por 30 segundos.');
            } else {
                this.alertService.showAlert('error', 'Credenciales incorrectas. Intenta nuevamente.');
            }
        },
    });
}

private cerrarModal(): void {
    if (this.loginModal?.nativeElement) {
        this.loginModal.nativeElement.classList.remove('show');
        this.loginModal.nativeElement.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.querySelector('.modal-backdrop')?.remove();
    }
}

}
