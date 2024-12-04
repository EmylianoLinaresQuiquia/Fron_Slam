import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Factura,DetalleFactura } from '../interfaces/Factura';
@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl = `${environment.apiUrl}factura`;

  constructor(private http: HttpClient) {}

  crearFactura(idPedido: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${idPedido}`, {});
  }

  verFactura(idFactura: number): Observable<{ factura: Factura; detalles: DetalleFactura[] }> {
    return this.http.get<{ factura: Factura; detalles: DetalleFactura[] }>(`${this.apiUrl}/${idFactura}`);
  }

}
