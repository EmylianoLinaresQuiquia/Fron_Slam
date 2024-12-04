import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';

import { ReportComponent } from './report/report.component';
import { OrderComponent } from './order/order.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductComponent } from './product/product.component';
import { CategorieComponent } from './categorie/categorie.component';
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent, // Usar el layout de admin
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },



      { path: 'dashboard', component: DashboardComponent },
      { path: 'report', component: ReportComponent },
      { path: 'order', component: OrderComponent },
      { path: 'customer', component: CustomersComponent },
      { path: 'categorie', component: CategorieComponent },
      { path: 'product', component: ProductComponent },





    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
