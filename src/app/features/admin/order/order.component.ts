import { PedidoDetalle } from './../interfaces/Pedido';

import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ApiClient } from '../../../api-client';
import { Pedido } from '../../../api-client';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SharedModule,NzDropDownModule,NzMenuModule],
  providers:[ApiClient],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  pedidos: Pedido[] = []; // Lista de pedidos
  PedidoDetalle: any; // Datos de la factura
  estado: string | undefined = undefined; // Estado opcional para filtro

  constructor(private apiClient: ApiClient) {}

  ngOnInit(): void {
    this.getPedidos(); // Llama a los pedidos al cargar el componente
    this.getDetallePedido(1)
  }

  getPedidos(): void {
    this.apiClient.pedidoAll(this.estado).subscribe({
      next: (response) => {
        this.pedidos = response;
        console.log('Pedidos:', this.pedidos);
      },
      error: (err) => {
        console.error('Error al obtener los pedidos:', err);
      }
    });
  }


  // Método para obtener los detalles de un pedido
  getDetallePedido(id_pedido: number): void {
    this.apiClient.pedidoGET(id_pedido).subscribe({
      next: (response) => {
        this.PedidoDetalle = response;
        console.log('Detalle pedido:', this.PedidoDetalle);
      },
      error: (err) => {
        console.error(`Error al obtener la factura con id ${id_pedido}:`, err);
      },
    });
  }

  // Método que se ejecuta al hacer clic en "Editar"
  onEditPedido(id_pedido: number): void {
    console.log(`Editando pedido con ID: ${id_pedido}`);
    this.getDetallePedido(id_pedido);
  }

}
