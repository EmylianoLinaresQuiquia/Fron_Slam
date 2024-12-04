import { Component ,Input,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';


@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [SharedModule,NzMenuModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {

  

 
}
