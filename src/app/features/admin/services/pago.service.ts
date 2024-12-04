import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Pago,MetodoPago } from '../interfaces/Pago';
@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrl = `${environment.apiUrl}metodo-pago`;

  constructor(private http: HttpClient) {}

  listarMetodosPago(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(this.apiUrl);
  }

  agregarMetodoPago(metodoPago: MetodoPago): Observable<void> {
    return this.http.post<void>(this.apiUrl, metodoPago);
  }

}
