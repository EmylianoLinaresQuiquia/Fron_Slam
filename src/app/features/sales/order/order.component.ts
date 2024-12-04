import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  constructor(private router: Router) {}


  navigateToOrder(): void {
    this.router.navigate(['/ventas/order']);
  }
  navigateToSettings(): void {
    this.router.navigate(['/ventas/settings']);
  }

  navigateToAddress(): void {
    this.router.navigate(['/ventas/address']);
  }


  navigateToPayment(): void {
    this.router.navigate(['/ventas/payment']);
  }


  navigateToNotification(): void {
    this.router.navigate(['/ventas/notification']);
  }

}
