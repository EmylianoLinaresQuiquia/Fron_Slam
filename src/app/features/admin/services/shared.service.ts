import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiClient } from '../../../api-client';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private carritoSubject = new BehaviorSubject<any[]>([]); // BehaviorSubject privado
  carrito$ = this.carritoSubject.asObservable(); // Observable expuesto

  constructor() {}

  // Método para agregar un producto al carrito
  agregarAlCarrito(producto: any): void {
    const carritoActual = this.carritoSubject.value;
    this.carritoSubject.next([...carritoActual, producto]); // Actualiza el carrito
  }

  // Método para eliminar un producto del carrito
  eliminarDelCarrito(index: number): void {
    const carritoActual = [...this.carritoSubject.value];
    carritoActual.splice(index, 1); // Remueve el producto
    this.carritoSubject.next(carritoActual); // Actualiza el carrito
  }

  // Obtener el carrito actual (opcional)
  obtenerCarrito(): any[] {
    return this.carritoSubject.value;
  }
}
