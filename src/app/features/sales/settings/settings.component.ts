import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  user: any;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    const userCookie = this.cookieService.get('user');
    if (userCookie) {
      this.user = JSON.parse(userCookie);
      console.log('Datos del usuario cargados:', this.user);
    } else {
      console.warn('No se encontraron datos de usuario.');
    }
  }
}
