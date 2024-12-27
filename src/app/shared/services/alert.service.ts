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

  showAlert(type: Alert['type'], message: string, duration: number = 5000): void {
    this.alertSubject.next({ type, message });

    // Limpia automáticamente la alerta después de un tiempo
    setTimeout(() => this.clearAlert(), duration);
  }

  clearAlert(): void {
    this.alertSubject.next(null);
  }

}
