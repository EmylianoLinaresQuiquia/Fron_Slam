import { AlertService } from './../../../../shared/services/alert.service';
import { UsuarioPost, ApiClient,SolicitudRecuperacion,CambioContrasena } from './../../../../api-client';
import { Component, OnInit,AfterViewInit , ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SharedService } from '../../../admin/services/shared.service';
import { IUsuarioPost } from '../../../../api-client';
import { UsuarioLogin } from './../../../../api-client';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CarritoService } from '../../../../shared/services/carrito.service';
import { Observable } from 'rxjs';
import { map,startWith  } from 'rxjs/operators';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
  carrito!: Observable<any[]>;

  user = new BehaviorSubject<any | null>(null);

  @ViewChild('loginModal') loginModal!: ElementRef;

  loginForm: FormGroup;

  recuperarForm: FormGroup;
  cambiarContrasenaForm: FormGroup;
  isRecoveryMode = false;
  loading = false;



  private failedAttempts = 0;
  private isLocked = false;
  usuario = {
    nombre: '',
    email: '',
    contrasena: '',
    dni: '',
    googleRegistro: false,
  };



  constructor(
    private sharedService: SharedService,
    private apiClientService: ApiClient,
    public alertService: AlertService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private carritoService: CarritoService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.cambiarContrasenaForm = this.fb.group({
      token: ['', Validators.required],
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  seleccionarCategoria(categoriaId: number): void {
    // Navegar al componente destino pasando el `categoriaId` como parámetro
    this.router.navigate(['/ventas/shop-grid', categoriaId]);
  }
  ngOnInit(): void {

    this.loadUserFromStorage();
    this.carrito = this.carritoService.carrito$.pipe(
      startWith([]), // Comienza con un array vacío
      map((data) => data || []) // Si es null o undefined, convierte en []
    );
  }
  initializeUsuario(): UsuarioPost {
    return {
      nombre: '',
      email: '',
      contrasena: '',
      dni: '',
      googleRegistro: false,
      init: function () {
        console.log('Usuario inicializado');
      },
      toJSON: function () {
        return JSON.stringify(this);
      },
    };
  }



  get carritoLength(): number {
    let length = 0;
    this.carritoService.carrito$.subscribe((carrito: any[]) => {
      length = carrito.length;
    }).unsubscribe(); // Aunque esto no es necesario con async pipe.
    return length;
  }

  eliminarProducto(index: number): void {
    this.carritoService.eliminarProducto(index);
  }

  loadUserFromStorage(): void {
    try {
      const user = this.cookieService.get('user');
      if (user) {
        this.user.next(JSON.parse(user));
      }
    } catch (error) {
      this.alertService.showAlert('error', 'Error al cargar el usuario desde el almacenamiento.');
      console.error('Error en loadUserFromStorage:', error);
    }
  }

  ngAfterViewInit(): void {
    try {
      google.accounts.id.initialize({
        client_id: '788781500500-ba71578oc93e236u8afrm6aqmh0lit26.apps.googleusercontent.com',
        callback: (response: any) => this.handleCredentialResponse(response),
      });
      google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'large' }
      );
    } catch (error) {
      this.alertService.showAlert('error', 'Error al inicializar el inicio de sesión con Google.');
      console.error('Error en Google Sign-In:', error);
    }
  }

  handleCredentialResponse(response: any): void {
    try {
      const jwtToken = response.credential;
      const userInfo = this.decodeJwt(jwtToken);

      const usuario: UsuarioPost = {
        nombre: userInfo.name || '',
        email: userInfo.email || '',
        contrasena: '',
        dni: '',
        googleRegistro: true,
        init: function () {
          console.log('Usuario inicializado');
        },
        toJSON: function () {
          return JSON.stringify(this);
        },
      };

      this.registrarUsuario();
    } catch (error) {
      this.alertService.showAlert('error', 'Error al procesar el inicio de sesión con Google.');
      console.error('Error en handleCredentialResponse:', error);
    }
  }

  decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      this.alertService.showAlert('error', 'Error al decodificar el token.');
      console.error('Error en decodeJwt:', error);
      return null;
    }
  }




  registrarUsuario(): void {
    try {
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

          this.cerrarModal();
        },
        (error) => {
          const errorMessage = error.error?.message || error.message || 'Ocurrió un error inesperado.';
          this.alertService.showAlert('danger', `Error al registrar el usuario: ${errorMessage}`);
          console.error('Error en registrarUsuario:', error);
        }
      );
    } catch (error) {
      this.alertService.showAlert('danger', 'Error inesperado al intentar registrar el usuario.');
      console.error('Error en registrarUsuario:', error);
    }
  }

  iniciarSesion(): void {
    try {
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
        email: this.loginForm.value.email,
        contrasena: this.loginForm.value.contrasena,
        googleLogin: false,
      });

      this.apiClientService.iniciarSesion(credentials).subscribe({
        next: (response) => {
          this.loading = false;
          this.failedAttempts = 0;

          if (response?.mensaje?.startsWith('Inicio de sesión exitoso')) {
            this.cookieService.set('user', JSON.stringify(response), { path: '/', expires: 7 });
            this.alertService.showAlert('success', `Bienvenido, ${response.nombre}.`);
            this.cerrarModal();
          } else {
            this.alertService.showAlert('warning', 'Inicio de sesión exitoso, pero no se encontraron detalles.');
          }
        },
        error: (error) => {
          this.loading = false;
          this.failedAttempts++;

          if (this.failedAttempts >= 3) {
            this.isLocked = true;
            setTimeout(() => {
              this.isLocked = false;
              this.failedAttempts = 0;
            }, 30000);
            this.alertService.showAlert('danger', 'Demasiados intentos fallidos. Cuenta bloqueada por 30 segundos.');
          } else {
            this.alertService.showAlert('danger', 'Credenciales incorrectas. Intenta nuevamente.');
          }
        },
      });
    } catch (error) {
      this.alertService.showAlert('danger', 'Error inesperado al intentar iniciar sesión.');
      console.error('Error en iniciarSesion:', error);
      this.loading = false;
    }
  }
  cambiarContrasena(): void {
    if (this.cambiarContrasenaForm.invalid) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    const { token, nuevaContrasena } = this.cambiarContrasenaForm.value;

    // Crear el objeto requerido por el servicio
    // Crear una instancia de la clase CambioContrasena
const cambioContrasena = new CambioContrasena();
cambioContrasena.token = token; // Asignar el token
cambioContrasena.nuevaContrasena = nuevaContrasena; // Asignar la nueva contraseña


    // Mostrar loading mientras se procesa la solicitud
    this.loading = true;

    // Llamar al servicio
    this.apiClientService.cambiarContrasena(cambioContrasena)
      .pipe(
        tap(() => {
          alert('La contraseña ha sido cambiada exitosamente.');

        }),
        catchError((error) => {
          console.error('Error al cambiar la contraseña:', error);
          alert('Ocurrió un error al intentar cambiar la contraseña. Intenta nuevamente.');
          return of(null);
        })
      )
      .subscribe(() => this.loading = false);
  }


  solicitarRecuperacion(): void {
    if (this.recuperarForm.invalid) {
      return;
    }

    this.loading = true;
    const { email } = this.recuperarForm.value;

    const solicitud = new SolicitudRecuperacion();
      solicitud.email = email; // Asignar el valor requerido
      // Construir el objeto correcto

    this.apiClientService.solicitarRecuperacion(solicitud) // Pasar el objeto completo
      .pipe(
        tap(() => {
          alert('Se ha enviado un enlace o token de recuperación a su correo electrónico.');
          this.toggleRecoveryMode(); // Volver al formulario de inicio de sesión
        }),
        catchError((error) => {
          console.error('Error al solicitar recuperación:', error);
          alert('Hubo un error al solicitar la recuperación. Intente nuevamente.');
          return of(null);
        })
      )
      .subscribe(() => (this.loading = false));
  }

  toggleRecoveryMode(): void {
    this.isRecoveryMode = !this.isRecoveryMode;

    // Sincronizar el correo entre los formularios
    const email = this.loginForm.get('email')?.value;
    if (email) {
      this.recuperarForm.patchValue({ email });
    }
  }



  private cerrarModal(): void {
    try {
      if (this.loginModal?.nativeElement) {
        this.loginModal.nativeElement.classList.remove('show');
        this.loginModal.nativeElement.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.querySelector('.modal-backdrop')?.remove();
      }
    } catch (error) {
      this.alertService.showAlert('error', 'Error al cerrar el modal.');
      console.error('Error en cerrarModal:', error);
    }




}
}
