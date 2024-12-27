import { Component ,Output,EventEmitter,CUSTOM_ELEMENTS_SCHEMA,OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { ApiClient } from '../../../../api-client';
import { ReporteService } from '../../services/reporte.service';
import { Notificacion,RespuestaNotificaciones } from '../../interfaces/reporte';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
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
  constructor(private ApiClient: ApiClient,private storageService: LocalStorageService,
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



    const user = this.storageService.getItem('user');
    if (user) {
        this.user = user;
        this.nombreUsuario = user.nombre || 'No disponible';
        this.emailUsuario = user.email || 'No disponible';
        this.rolUsuario = user.rol || 'No definido';
    } else {
        this.setDefaultUser();
    }
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
  logout(): void {
    this.storageService.removeItem('user'); // Eliminar datos del usuario
    this.clearUserData();
    console.log('Sesión cerrada. Redirigiendo...');
    if (typeof window !== 'undefined') {
      window.location.href = '/login'; // Redirigir al inicio de sesión (solo en cliente)
    }
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
