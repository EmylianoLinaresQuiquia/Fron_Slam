export interface Notificacion {
  notificacionTexto: string;
  tipo: string;
  referenciaId: number;
}

export interface RespuestaNotificaciones {
  message: string;
  productosBajoStock: Notificacion[];
  pedidosPendientes: Notificacion[];
  cambiosEstados: any[]; // Cambiar a una interfaz específica si es posible
  nuevasResenas: any[]; // Cambiar a una interfaz específica si es posible
}
