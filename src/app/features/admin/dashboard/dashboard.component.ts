import { ApiClient, PedidoReciente } from './../../../api-client';
import { Component,ElementRef,ViewChild,AfterViewInit,OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Chart } from '@antv/g2';
import { CurrencyPipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  providers: [CurrencyPipe,ApiClient],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',

})
export class DashboardComponent implements OnInit {
  pedidoReciente: any = {
    idPedido: null,
    total: null,
    fechaPedido: null,
    estado: null,
    usuarioNombre: null,
    usuarioEmail: null,
  };
    resumenVentas: any = {};
    productosMasVendidos: any[] = [];
    ventasPorCategoria: any[] = [];
    clientesFrecuentes: any[] = [];

    constructor(private apiClient: ApiClient) {}

    ngOnInit(): void {
      this.obtenerPedidoReciente();
      this.obtenerResumenVentas(new Date('2024-01-01'), new Date('2024-12-31'));

      this.obtenerProductosMasVendidos(new Date('2024-01-01'), new Date('2024-12-31'), 5);
      this.obtenerVentasPorCategoria(new Date('2024-01-01'), new Date('2024-12-31'));
      this.obtenerClientesFrecuentes(10);
    }

    obtenerPedidoReciente(): void {
      this.apiClient.pedidoReciente().subscribe({
        next: (data) => {
          console.log('Datos recibidos:', data);

          // Si data es un objeto, lo asigna directamente
          if (data && typeof data === 'object') {
            this.pedidoReciente = data;
          } else {
            console.warn('La respuesta no contiene un pedido reciente válido.');
            this.pedidoReciente = {
              idPedido: null,
              total: null,
              fechaPedido: null,
              estado: null,
              usuarioNombre: null,
              usuarioEmail: null
            };
          }
        },
        error: (error) => {
          console.error('Error al obtener el pedido reciente:', error);
          this.pedidoReciente = {
            idPedido: null,
            total: null,
            fechaPedido: null,
            estado: null,
            usuarioNombre: null,
            usuarioEmail: null
          };
        }
      });
    }




obtenerResumenVentas(fechaInicio: Date, fechaFin: Date): void {
  console.log('Fecha de inicio:', fechaInicio);
  console.log('Fecha de fin:', fechaFin);

  this.apiClient.resumenVentas(fechaInicio, fechaFin).subscribe({
    next: (data) => {
      console.log('Datos recibidos:', data);
      if (Array.isArray(data) && data.length > 0) {
        this.resumenVentas = data[0]; // Asigna el primer elemento del array.
      } else {
        console.warn('La respuesta no contiene datos de ventas.');
        this.resumenVentas = { ingresos: 0, totalPedidos: 0 }; // Default para evitar errores en la plantilla.
      }
    },
    error: (error) => {
      console.error('Error al obtener el resumen de ventas:', error);
      this.resumenVentas = { ingresos: 0, totalPedidos: 0 }; // Default en caso de error.
    }
  });
}






obtenerProductosMasVendidos(fechaInicio: Date, fechaFin: Date, limite: number): void {
  console.log('Fecha de inicio:', fechaInicio);
  console.log('Fecha de fin:', fechaFin);

  this.apiClient.productosMasVendidos(fechaInicio, fechaFin).subscribe({
    next: (data) => {
      console.log('Datos recibidos:', data);
      if (Array.isArray(data) && data.length > 0) {
        this.productosMasVendidos = data; // Asigna la data correctamente
      } else {
        console.warn('La respuesta no contiene datos de productos.');
        this.productosMasVendidos = []; // Inicializa vacío si no hay datos
      }
    },
    error: (error) => {
      console.error('Error al obtener los productos más vendidos:', error);
      this.productosMasVendidos = []; // En caso de error
    }
  });
}



obtenerVentasPorCategoria(fechaInicio: Date, fechaFin: Date): void {
  console.log('Fecha de inicio:', fechaInicio);
  console.log('Fecha de fin:', fechaFin);

  this.apiClient.ventasPorCategoria(fechaInicio, fechaFin).subscribe({
    next: (data) => {
      console.log('Datos recibidos:', data);
      if (Array.isArray(data) && data.length > 0) {
        this.ventasPorCategoria = data; // Asigna correctamente la data
      } else {
        console.warn('La respuesta no contiene datos de categoría.');
        this.ventasPorCategoria = []; // Inicializa vacío si no hay datos
      }
    },
    error: (error) => {
      console.error('Error al obtener las ventas por categoría:', error);
      this.ventasPorCategoria = []; // Inicializa vacío en caso de error
    }
  });
}

    obtenerClientesFrecuentes(limite: number): void {
      this.apiClient.clientesFrecuentes().subscribe({
        next: (data) => {
          this.clientesFrecuentes = data;
          console.log('Clientes frecuentes:', this.clientesFrecuentes);
        },
        error: (error) => {
          console.error('Error al obtener los clientes frecuentes:', error);
        }
      });
    }
  }



