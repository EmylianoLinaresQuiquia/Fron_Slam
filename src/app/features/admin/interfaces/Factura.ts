export interface Factura {
  id_factura: number;
  id_pedido: number;
  numero_factura: string;
  total: number;
}

export interface DetalleFactura {
  id_detalle_factura: number;
  id_factura: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}
