import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesLayoutComponent } from '../../layouts/sales-layout/sales-layout.component';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { OrderComponent } from './order/order.component';

import { ShopSingleComponent } from './shop-single/shop-single.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { NotificationComponent } from './notification/notification.component';
import { SettingsComponent } from './settings/settings.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';
import { ShopCheckoutComponent } from './shop-checkout/shop-checkout.component';
import { ShopGridComponent } from './shop-grid/shop-grid.component';
const routes: Routes = [
  {
    path: '',
    component: SalesLayoutComponent, // Aquí usamos el layout
    children: [
      { path: '', redirectTo: 'catalog', pathMatch: 'full' },
      { path: 'catalog', component: CatalogComponent },
      { path: 'cart', component: CartComponent },



      { path: 'checkout', component: ShopCheckoutComponent },

      { path: 'shop-cart', component: ShopCartComponent },
      { path: 'shop-grid/:cateorgiaId', component: ShopGridComponent },


    // Rutas agrupadas bajo MisPedidosComponent
    {
      path: 'ventas',
      component: MisPedidosComponent, // Componente contenedor (Tabview con router-outlet)
      children: [
        { path: 'order', component: OrderComponent },
        { path: 'settings', component: SettingsComponent },
        { path: 'address', component: AddressComponent },
        { path: 'payment', component: PaymentComponent },
        { path: 'notification', component: NotificationComponent },
        { path: '', redirectTo: 'order', pathMatch: 'full' }, // Ruta predeterminada
      ],
    },

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
