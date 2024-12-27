import { Component ,OnInit} from '@angular/core';
import { AlertService,Alert  } from '../../services/alert.service';
import { SharedModule } from '../../shared.module';
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit{
  alert: Alert | null = null;
  icons = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
             </svg>`,
    danger: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
               <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
             </svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-4.412-.86-.1a.687.687 0 0 0-.79.6.667.667 0 0 0 .6.79l.84.1c.413.049.78-.269.83-.686a.667.667 0 0 0-.6-.79z"/>
             </svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
             <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-4.412-.86-.1a.687.687 0 0 0-.79.6.667.667 0 0 0 .6.79l.84.1c.413.049.78-.269.83-.686a.667.667 0 0 0-.6-.79z"/>
           </svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-4.646-3.646a.5.5 0 0 1 .708.708L8.707 8l3.355 3.354a.5.5 0 0 1-.708.708L8 8.707l-3.354 3.355a.5.5 0 0 1-.708-.708L7.293 8 3.938 4.646a.5.5 0 1 1 .708-.708L8 7.293l3.354-3.354z"/>
            </svg>`
  };


  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alert$.subscribe(alert => this.alert = alert);
  }
}
