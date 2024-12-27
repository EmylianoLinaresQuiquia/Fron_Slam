import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito = new BehaviorSubject<any[]>(this.obtenerCarritoInicial());

  carrito$ = this.carrito.asObservable();

  private obtenerCarritoInicial(): any[] {
    const carritoActual = localStorage.getItem('carrito');
    return carritoActual ? JSON.parse(carritoActual) : [];
  }

  agregarProducto(producto: any): void {
    const carritoActual = this.carrito.value;
    const nuevoCarrito = [...carritoActual, producto];

    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    this.carrito.next(nuevoCarrito);
  }

  eliminarProducto(index: number): void {
    const carritoActual = this.carrito.value;
    const nuevoCarrito = [...carritoActual];
    nuevoCarrito.splice(index, 1);

    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    this.carrito.next(nuevoCarrito);
  }

  obtenerCarrito(): any[] {
    return this.carrito.value;
  }
}
