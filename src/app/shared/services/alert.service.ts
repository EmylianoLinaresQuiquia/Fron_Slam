import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
  type: 'success' | 'error' | 'warning' | 'info' | 'danger';
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);
  alert$ = this.alertSubject.asObservable();

  showAlert(type: Alert['type'], message: string): void {
    this.alertSubject.next({ type, message });

    // Opcional: limpiar alerta después de un tiempo
    setTimeout(() => this.clearAlert(), 5000);
  }

  clearAlert(): void {
    this.alertSubject.next(null);
  }

}
