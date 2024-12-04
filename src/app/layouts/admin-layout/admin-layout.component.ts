import { Component,ElementRef,ViewChild } from '@angular/core';
import { AdminHeaderComponent } from '../../features/admin/layouts/admin-header/admin-header.component';
import { AdminSidebarComponent } from '../../features/admin/layouts/admin-sidebar/admin-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { StyleManagerService } from '../../core/services/style-manager.service';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    AdminHeaderComponent,
    AdminSidebarComponent,
    RouterOutlet
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {


}
