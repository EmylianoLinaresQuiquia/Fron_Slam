import { Component,OnInit,OnDestroy } from '@angular/core';
import { SalesHeaderComponent } from '../../features/sales/layouts/sales-header/sales-header.component';
import { SalesFooterComponent } from '../../features/sales/layouts/sales-footer/sales-footer.component';
import { RouterOutlet } from '@angular/router';

import { StyleManagerService } from '../../core/services/style-manager.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-sales-layout',
  standalone: true,
  imports: [
    SalesHeaderComponent,
    SalesFooterComponent,
    RouterOutlet
  ],
  templateUrl: './sales-layout.component.html',
  styleUrl: './sales-layout.component.css'
})
export class SalesLayoutComponent   {
  
}
