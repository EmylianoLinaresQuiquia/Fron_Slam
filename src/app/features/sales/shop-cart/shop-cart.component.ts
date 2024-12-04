import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-shop-cart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './shop-cart.component.html',
  styleUrl: './shop-cart.component.css'
})
export class ShopCartComponent {
  carrito: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    const carritoActual = localStorage.getItem('carrito');
    if (carritoActual) {
      try {
        this.carrito = JSON.parse(carritoActual);
      } catch (error) {
        console.error('Error al parsear el carrito:', error);
        this.carrito = [];
      }
    } else {
      this.carrito = [];
    }
  }
}
