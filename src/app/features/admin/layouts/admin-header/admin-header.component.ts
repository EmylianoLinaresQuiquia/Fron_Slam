import { Component ,Output,EventEmitter,CUSTOM_ELEMENTS_SCHEMA,OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [SharedModule,NzDropDownModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit{
  siteStyle = 'dark'; // o 'light' dependiendo de tu lógica
  user: any = null;
  isCollapsed = false; // o true dependiendo de tu lógica


  nombreUsuario: string | null = null; // Nombre del usuario
  emailUsuario: string | null = null; // Email del usuario
  rolUsuario: string | null = null; // Rol del usuario

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    const userCookie = this.cookieService.get('user');

    if (userCookie) {
      try {
        this.user = JSON.parse(userCookie);
        console.log('Datos del usuario cargados desde la cookie:', this.user);
      } catch (error) {
        console.error('Error al analizar la cookie del usuario:', error);
        this.user = {
          nombre: 'No disponible',
          email: 'No disponible',
          rol: 'No definido',
          direccion: { calle: 'No disponible', ciudad: 'No disponible', pais: 'No disponible' },
        };
      }
    } else {
      console.warn('No se encontró la cookie del usuario o está vacía.');
      this.user = {
        nombre: 'No disponible',
        email: 'No disponible',
        rol: 'No definido',
        direccion: { calle: 'No disponible', ciudad: 'No disponible', pais: 'No disponible' },
      };
    }

    // Mostrar por consola el usuario para depuración
    console.log('Estado final del usuario en AdminHeaderComponent:', this.user);
  }



  private clearUserData() {
    this.user = null;
    this.nombreUsuario = null;
    this.emailUsuario = null;
    this.rolUsuario = null;
  }
  logout() {
    this.cookieService.delete('user', '/'); // Borra la cookie del usuario
    this.clearUserData();
    console.log('Sesión cerrada. Redirigiendo...');
    // Puedes redirigir a la página de inicio de sesión o cualquier otra
    window.location.href = '/login';
  }


  navigationInfo = {
    header: true // o false dependiendo de tu lógica
  };
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateToProfile() {
    // Lógica para navegar al perfil
  }


  showNotifications(): void {
    // Lógica para mostrar notificaciones
    console.log('Notificaciones mostradas');
  }


}
