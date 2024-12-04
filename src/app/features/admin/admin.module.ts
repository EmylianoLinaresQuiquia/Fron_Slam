// admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './layouts/admin-header/admin-header.component';
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AdminLayoutComponent, // Importa el layout pero no el header, ya que está en SharedModule
    AdminHeaderComponent
  ],
  exports:[
    AdminHeaderComponent
  ]
})
export class AdminModule {}
