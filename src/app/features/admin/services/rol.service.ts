import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Rol } from '../interfaces/Rol';
@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrl = `${environment.apiUrl}rol`;

  constructor(private http: HttpClient) {}

  obtenerRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl);
  }

  agregarRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiUrl, rol);
  }

  editarRol(id: number, rol: Rol): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, rol);
  }

  eliminarRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
