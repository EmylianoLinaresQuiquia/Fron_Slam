import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
@Component({
  selector: 'app-shop-cart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './shop-cart.component.html',
  styleUrl: './shop-cart.component.css'
})
export class ShopCartComponent {
  carrito: any[] = [];
  subtotal: number = 0;
  serviceFee: number = 3; // Fee fijo
  total: number = 0;

  constructor(private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.cargarCarrito();
    this.calcularTotales();
  }

  cargarCarrito(): void {
    const carritoActual = this.localStorageService.getItem('carrito');
    if (carritoActual) {
      this.carrito = carritoActual;
      console.log('Carrito cargado:', this.carrito);
    } else {
      this.carrito = [];
    }
  }


  incrementarCantidad(item: any): void {
    item.cantidad_disponible++;
    this.calcularTotales();
    this.actualizarCarrito();
  }

  decrementarCantidad(item: any): void {
    if (item.cantidad_disponible > 1) {
      item.cantidad_disponible--;
      this.calcularTotales();
      this.actualizarCarrito();
    }
  }

  eliminarProducto(item: any): void {
    this.carrito = this.carrito.filter(producto => producto.id_producto !== item.id_producto);
    this.calcularTotales();
    this.actualizarCarrito();
  }

  calcularTotales(): void {
    this.subtotal = this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad_disponible, 0);
    this.total = this.subtotal + this.serviceFee;
  }

  actualizarCarrito(): void {
    this.localStorageService.setItem('carrito', this.carrito);
  }


  irACheckout(): void {
    const checkoutData = {
      carrito: this.carrito,
      subtotal: this.subtotal,
      total: this.total,
    };
    this.localStorageService.setItem('checkoutData', checkoutData);
    this.router.navigate(['/ventas/checkout']);
  }

}
