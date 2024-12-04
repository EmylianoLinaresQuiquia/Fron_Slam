export interface Pedido {
  id_pedido: number;
  id_usuario: number;
  total: number;
  estado: 'pendiente' | 'enviado' | 'entregado' | 'cancelado';
  direccion_entrega_calle: string;
  direccion_entrega_ciudad: string;
  direccion_entrega_codigo_postal: string;
  direccion_entrega_pais: string;
}

export interface HistorialEstadoPedido {
  id_historial: number;
  id_pedido: number;
  estado_anterior: string;
  estado_nuevo: string;
  fecha_cambio: Date;
}

export interface PedidoDetalle {
  id_detalle: number;
  id_pedido: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
}
