import { FacturaService } from './../services/factura.service';

import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Categoria } from '../interfaces/categoria.model';
import { Subcategoria } from '../interfaces/Subcategoria';
import { Pedido,PedidoDetalle } from '../interfaces/Pedido';
import { Usuario } from '../interfaces/Usuario';
import { MetodoPago } from '../interfaces/Pago';

import { CategoriaService } from '../services/categoria.service';
import { SubcategoriaService } from '../services/subcategoria.service';
import { PedidoService } from './../services/pedido.service';
import { UsuarioService } from '../services/usuario.service';
import { PagoService } from '../services/pago.service';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SharedModule,NzDropDownModule,NzMenuModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  pedidos: Pedido[] = [];
  usuarios: Usuario[] = [];
  metodosPago: MetodoPago[] = [];
  detallesPedido: PedidoDetalle[] = [];
  //detalleUsuario: DetalleUsuario | null = null;

  constructor(
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private facturaService: FacturaService,
    private metodoPagoService: PagoService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarSubcategorias();
    this.cargarPedidos();
    this.cargarUsuarios();
    this.cargarMetodosPago();
  }

  // Cargar categorías
  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (categorias) => (this.categorias = categorias),
      error: (err) => console.error('Error al cargar categorías:', err),
    });
  }

  // Cargar subcategorías
  cargarSubcategorias(): void {
    this.subcategoriaService.obtenerSubcategorias().subscribe({
      next: (subcategorias) => (this.subcategorias = subcategorias),
      error: (err) => console.error('Error al cargar subcategorías:', err),
    });
  }

  // Cargar pedidos
  cargarPedidos(): void {
    this.pedidoService.obtenerPedidos().subscribe({
      next: (pedidos) => (this.pedidos = pedidos),
      error: (err) => console.error('Error al cargar pedidos:', err),
    });
  }

  // Cargar usuarios
  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarios) => (this.usuarios = usuarios),
      error: (err) => console.error('Error al cargar usuarios:', err),
    });
  }

  // Cargar métodos de pago
  cargarMetodosPago(): void {
    this.metodoPagoService.listarMetodosPago().subscribe({
      next: (metodosPago) => (this.metodosPago = metodosPago),
      error: (err) => console.error('Error al cargar métodos de pago:', err),
    });
  }

  // Ver detalle de un pedido
  verDetallePedido(idPedido: number): void {
    this.pedidoService.obtenerDetallePedido(idPedido).subscribe({
      next: (detalles) => (this.detallesPedido = detalles),
      error: (err) => console.error('Error al obtener detalles del pedido:', err),
    });
  }

  // Ver detalle de un usuario
  /*verDetalleUsuario(idUsuario: number): void {
    this.usuarioService.obtenerDetalleUsuario(idUsuario).subscribe({
      next: (detalle) => (this.detalleUsuario = detalle),
      error: (err) => console.error('Error al obtener detalle del usuario:', err),
    });
  }*/

  // Crear factura para un pedido
  crearFacturaParaPedido(idPedido: number): void {
    this.facturaService.crearFactura(idPedido).subscribe({
      next: () => console.log(`Factura creada para el pedido ${idPedido}`),
      error: (err) => console.error('Error al crear factura:', err),
    });
  }

  // Cambiar estado de un pedido
  cambiarEstadoPedido(idPedido: number, nuevoEstado: string): void {
    this.pedidoService.cambiarEstadoPedido(idPedido, nuevoEstado).subscribe({
      next: () => {
        console.log(`Estado del pedido ${idPedido} cambiado a ${nuevoEstado}`);
        this.cargarPedidos(); // Actualizar la lista de pedidos
      },
      error: (err) => console.error('Error al cambiar el estado del pedido:', err),
    });
  }

}
