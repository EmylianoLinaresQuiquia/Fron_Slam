import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { AdminHeaderComponent } from '../features/admin/layouts/admin-header/admin-header.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminHeaderComponent
  ],
  exports:[AdminHeaderComponent]
})
export class LayoutsModule { }
