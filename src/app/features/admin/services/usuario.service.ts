import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Usuario } from '../interfaces/Usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${environment.apiUrl}usuario`;

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  /*obtenerDetalleUsuario(id: number): Observable<DetalleUsuario> {
    return this.http.get<DetalleUsuario>(`${this.apiUrl}/${id}/detalle`);
  }*/

  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  editarUsuario(id: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
