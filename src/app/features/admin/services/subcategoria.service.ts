import { Subcategoria } from './../interfaces/Subcategoria';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  private apiUrl = `${environment.apiUrl}subcategoria`;

  constructor(private http: HttpClient) {}

  obtenerSubcategorias(): Observable<Subcategoria[]> {
    return this.http.get<Subcategoria[]>(this.apiUrl);
  }

  agregarSubcategoria(subcategoria: Subcategoria): Observable<Subcategoria> {
    return this.http.post<Subcategoria>(this.apiUrl, subcategoria);
  }

  editarSubcategoria(id: number, subcategoria: Subcategoria): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, subcategoria);
  }

  eliminarSubcategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
