import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-shop-single',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './shop-single.component.html',
  styleUrl: './shop-single.component.css'
})
export class ShopSingleComponent {
  producto: any = null;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    // Recupera los detalles del producto desde la cookie
    const productoJson = this.cookieService.get('productoSeleccionado');
    if (productoJson) {
      this.producto = JSON.parse(productoJson);
      console.log('Producto recuperado:', this.producto);
    } else {
      console.warn('No se encontró información del producto.');
    }
  }
}
