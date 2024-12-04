import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Pedido,PedidoDetalle,HistorialEstadoPedido } from '../interfaces/Pedido';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = `${environment.apiUrl}pedido`;

  constructor(private http: HttpClient) {}

  obtenerPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  obtenerDetallePedido(id: number): Observable<PedidoDetalle[]> {
    return this.http.get<PedidoDetalle[]>(`${this.apiUrl}/${id}`);
  }

  historialPedido(id: number): Observable<HistorialEstadoPedido[]> {
    return this.http.get<HistorialEstadoPedido[]>(`${this.apiUrl}/${id}/historial`);
  }

  cambiarEstadoPedido(id: number, estado: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/estado`, { estado });
  }

}
