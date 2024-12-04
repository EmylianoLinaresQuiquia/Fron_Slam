export interface Pago {
  id_pago: number;
  id_pedido: number;
  id_metodo_pago: number;
  monto: number;
}

export interface MetodoPago {
  id_metodo_pago: number;
  nombre: string;
}
