import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Notificacion ,RespuestaNotificaciones} from '../interfaces/reporte';
@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private baseUrl = 'https://localhost:7171/api/Reportes'; // Cambia a la URL de tu backend
  constructor(private http: HttpClient) {}

  // Método para obtener las notificaciones
  obtenerNotificaciones(): Observable<RespuestaNotificaciones> {
    return this.http.get<RespuestaNotificaciones>(`${this.baseUrl}/notificaciones`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error inesperado.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
