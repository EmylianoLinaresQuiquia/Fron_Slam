import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito = new BehaviorSubject<any[]>(this.obtenerCarritoInicial());
  carrito$ = this.carrito.asObservable();

  constructor(private localStorageService: LocalStorageService) {}

  private obtenerCarritoInicial(): any[] {
    const carritoActual = this.localStorageService.getItem('carrito');
    return carritoActual || []; // Si está en SSR, siempre retornará un carrito vacío.
  }

  agregarProducto(producto: any): void {
    const carritoActual = this.carrito.value;
    const nuevoCarrito = [...carritoActual, producto];
    this.localStorageService.setItem('carrito', nuevoCarrito);
    this.carrito.next(nuevoCarrito);
  }

  eliminarProducto(index: number): void {
    const carritoActual = this.carrito.value;
    const nuevoCarrito = [...carritoActual];
    nuevoCarrito.splice(index, 1);
    this.localStorageService.setItem('carrito', nuevoCarrito);
    this.carrito.next(nuevoCarrito);
  }

  obtenerCarrito(): any[] {
    return this.carrito.value;
  }
}
