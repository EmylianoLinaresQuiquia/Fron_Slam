import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SalesRoutingModule } from './sales-routing.module';
import { RouterOutlet } from '@angular/router';

import { SalesLayoutComponent } from '../../layouts/sales-layout/sales-layout.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SalesHeaderComponent } from './layouts/sales-header/sales-header.component';
import { SalesFooterComponent } from './layouts/sales-footer/sales-footer.component';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [
    //SalesLayoutComponent,
    //CatalogComponent,
    //CartComponent,
    //CheckoutComponent,
    //SalesHeaderComponent,

    ],
  imports: [
    CommonModule,
    SharedModule,
    SalesFooterComponent,
    SalesHeaderComponent,
    SalesRoutingModule
  ]
})
export class SalesModule { }
