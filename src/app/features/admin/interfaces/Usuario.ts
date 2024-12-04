export interface Usuario {
  id_usuario: number;
  nombre: string;
  contrasena_hashed: string;
  id_rol: number;
  activo: boolean;
}


export class UsuarioDetalles {
  idUsuario?: number;
  nombre?: string;
  email?: string;
  rol?: string;
  telefono?: string;
  direccionCalle?: string;
  direccionCiudad?: string;
  direccionCodigoPostal?: string;
  direccionPais?: string;
  activo?: boolean;
  fechaRegistro?: string;
}
