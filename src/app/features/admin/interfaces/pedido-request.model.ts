export interface PedidoRequest {
    idCliente: number;
    productos: ProductoPedido[];
    direccionCalle: string;
    direccionCiudad: string;
    direccionCodigoPostal: string;
    direccionPais: string;
  }
  
  export interface ProductoPedido {
    idProducto: number;
    cantidad: number;
  }
  