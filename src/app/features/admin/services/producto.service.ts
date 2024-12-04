import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Producto,Productolist,ProductoActualizar } from '../interfaces/producto.model';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = `${environment.apiUrl}producto`;

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Productolist[]> {
    return this.http.get<Productolist[]>(this.apiUrl);
  }

  // Método para agregar un producto, utilizando la interfaz Producto
  agregarProducto(producto: FormData): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
}

 // Eliminar un producto
 eliminarProducto(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

 // Editar un producto
 editarProducto(producto: ProductoActualizar): Observable<void> {
  const formData = new FormData();

  // Agregar datos al FormData
  formData.append('id_producto', producto.id_producto.toString());
  if (producto.nombre) formData.append('nombre', producto.nombre);
  if (producto.descripcion) formData.append('descripcion', producto.descripcion);
  if (producto.categoria_id !== undefined) {
    formData.append('categoria_id', producto.categoria_id.toString());
  }
  if (producto.subcategoria_id !== undefined) {
    formData.append('subcategoria_id', producto.subcategoria_id.toString());
  }
  if (producto.marca) formData.append('marca', producto.marca);
  if (producto.precio !== undefined) {
    formData.append('precio', producto.precio.toString());
  }
  if (producto.cantidad_disponible !== undefined) {
    formData.append('cantidad_disponible', producto.cantidad_disponible.toString());
  }
  if (producto.unidad_medida) formData.append('unidad_medida', producto.unidad_medida);
  if (producto.activo !== undefined) {
    formData.append('activo', producto.activo.toString());
  }
  if (producto.imagen_archivo) {
    formData.append('imagen_archivo', producto.imagen_archivo, producto.imagen_archivo.name);
  }
  if (producto.imagen_url) formData.append('imagen_url', producto.imagen_url);

  // Enviar la solicitud PUT con FormData
  return this.http.put<void>(this.apiUrl, formData);
}
// Buscar un producto por ID
buscarProductoPorId(id: number): Observable<Producto> {
  return this.http.get<Producto>(`${this.apiUrl}/${id}`);
}

}
