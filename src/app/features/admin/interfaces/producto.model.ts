export interface Producto {
  id_producto?: number;
  nombre: string;
  descripcion: string;
  categoria_id: number;
  subcategoria_id?: number;
  marca: string;
  precio: number;
  cantidad_disponible: number;
  unidad_medida: string;
  imagen_url: File | null; // Para coincidir con IFormFile? en C#
  fecha_agregado: Date;
  activo: boolean;
}

// Interfaz para Productolist
export interface Productolist {
  id_producto?: number;
  producto_nombre: string;
  producto_descripcion: string;
  marca: string;
  precio: number;
  cantidad_disponible: number;
  unidad_medida: string;
  imagen_url: string;
  fecha_agregado: Date;
  activo: boolean;

  categoria_nombre?: string;
  categoria_descripcion?: string;
  subcategoria_nombre?: string;
  subcategoria_descripcion?: string;
}

export interface ProductoActualizar {
  id_producto: number; // Obligatorio
  nombre?: string;
  descripcion?: string;
  categoria_id?: number;
  subcategoria_id?: number;
  marca?: string;
  precio?: number;
  cantidad_disponible?: number;
  unidad_medida?: string;
  imagen_archivo?: File; // Archivo de imagen para actualizar
  imagen_url?: string;   // URL existente de la imagen
  activo?: boolean;
}
