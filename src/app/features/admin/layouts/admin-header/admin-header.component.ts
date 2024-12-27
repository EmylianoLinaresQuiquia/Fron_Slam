import { Component ,Output,EventEmitter,CUSTOM_ELEMENTS_SCHEMA,OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CookieService } from 'ngx-cookie-service';
import { ApiClient } from '../../../../api-client';
import { ReporteService } from '../../services/reporte.service';
import { Notificacion,RespuestaNotificaciones } from '../../interfaces/reporte';
@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [SharedModule,NzDropDownModule],
  providers:[ApiClient],
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





  notificaciones: RespuestaNotificaciones | null = null;
  errorMessage: string = '';
  constructor(private ApiClient: ApiClient,
    private reporteService: ReporteService) {}

  ngOnInit() {
    this.reporteService.obtenerNotificaciones().subscribe({
      next: (data) => {
        this.notificaciones = data;
        console.log('Notificaciones obtenidas:', this.notificaciones);
      },
      error: (err) => {
        this.errorMessage = err;
        console.error('Error al obtener notificaciones:', err);
      }
    });



    const userLocalStorage = localStorage.getItem('user'); // Recuperar datos desde localStorage
    if (userLocalStorage) {
      try {
        this.user = JSON.parse(userLocalStorage); // Parsear datos JSON
        console.log('Datos del usuario cargados desde localStorage:', this.user);

        // Asignar valores a las propiedades
        this.nombreUsuario = this.user.nombre || 'No disponible';
        this.emailUsuario = this.user.email || 'No disponible';
        this.rolUsuario = this.user.rol || 'No definido';
      } catch (error) {
        console.error('Error al analizar los datos del usuario desde localStorage:', error);
        this.setDefaultUser();
      }
    } else {
      console.warn('No se encontraron datos del usuario en localStorage.');
      this.setDefaultUser();
    }

    console.log('Estado final del usuario en AdminHeaderComponent:', this.user);
  }

  private setDefaultUser() {
    this.user = {
      nombre: 'No disponible',
      email: 'No disponible',
      rol: 'No definido',
      direccion: { calle: 'No disponible', ciudad: 'No disponible', pais: 'No disponible' },
    };
    this.nombreUsuario = this.user.nombre;
    this.emailUsuario = this.user.email;
    this.rolUsuario = this.user.rol;
  }



  private clearUserData() {
    this.user = null;
    this.nombreUsuario = null;
    this.emailUsuario = null;
    this.rolUsuario = null;
  }
  logout() {
    localStorage.removeItem('user'); // Eliminar datos del usuario de localStorage
    this.clearUserData();
    console.log('Sesión cerrada. Redirigiendo...');
    window.location.href = '/login'; // Redirigir al inicio de sesión
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
