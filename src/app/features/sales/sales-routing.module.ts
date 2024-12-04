import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesLayoutComponent } from '../../layouts/sales-layout/sales-layout.component';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { OrderComponent } from './order/order.component';
import { SettingsComponent } from './settings/settings.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { NotificationComponent } from './notification/notification.component';
import { ShopSingleComponent } from './shop-single/shop-single.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
const routes: Routes = [
  {
    path: '',
    component: SalesLayoutComponent, // Aquí usamos el layout
    children: [
      { path: '', redirectTo: 'catalog', pathMatch: 'full' },
      { path: 'catalog', component: CatalogComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'shop-cart', component: ShopCartComponent },


      { path: 'order', component: OrderComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'address', component: AddressComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'shop-single', component: ShopSingleComponent },

      { path: 'blog', component: BlogComponent },
      { path: 'contac', component: ContactComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
