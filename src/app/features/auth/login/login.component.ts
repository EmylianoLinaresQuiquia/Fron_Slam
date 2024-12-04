import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ApiClient } from '../../../api-client';
import { UsuarioLogin } from '../../../api-client';
import { IUsuarioLogin } from '../../../api-client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioDetalles } from '../../admin/interfaces/Usuario';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    ApiClient, // Solo deja los proveedores específicos del componente
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;
  private failedAttempts = 0;
  private isLocked = false;

  public alertService: AlertService;

  constructor(
    private fb: FormBuilder,
    private apiClient: ApiClient,
    private router: Router,
    alertService: AlertService, // Inyección de dependencia
    private cookieService: CookieService
  ) {
    this.alertService = alertService;
    this.loginForm = this.fb.group({
      nombre: ['', [Validators.required]],
      contrasena: ['', [Validators.required, Validators.minLength(5)]],
    });
  }


  onSubmit() {
    this.errorMessage = null;

    if (this.isLocked) {
      this.alertService.showAlert('warning', 'La cuenta está bloqueada. Intenta nuevamente más tarde.');
      return;
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    // Crear una instancia de UsuarioLogin
    const credentials = new UsuarioLogin({
      email: this.loginForm.value.nombre,
      contrasena: this.loginForm.value.contrasena,
      googleLogin: false
    });

    this.apiClient.iniciarSesion(credentials).subscribe({
      next: (response) => {
        this.loading = false;
        this.failedAttempts = 0;

        if (response?.mensaje?.startsWith('Inicio de sesión exitoso')) { // Cambiado "message" a "mensaje"
          const userDetails = response as UsuarioDetalles;

          // Guarda los detalles en la cookie
          this.cookieService.set('user', JSON.stringify(userDetails), { path: '/', expires: 7 });

          // Muestra una alerta de éxito
          this.alertService.showAlert('success', `Bienvenido, ${userDetails.nombre}.`);

          // Redirige al dashboard
          this.router.navigate(['/admin/dashboard']);
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
          }, 30000); // Bloqueo por 30 segundos
          this.alertService.showAlert('danger', 'Demasiados intentos fallidos. Cuenta bloqueada por 30 segundos.');
        } else {
          this.alertService.showAlert('error', 'Credenciales incorrectas. Intenta nuevamente.');
        }

        console.error('Error al iniciar sesión:', error);
      },
    });
  }




}
