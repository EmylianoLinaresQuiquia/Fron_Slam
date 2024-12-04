import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'ventas',
    loadChildren: () => import('./features/sales/sales.module').then(m => m.SalesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, // Redirige a auth inicialmente
  { path: '**', redirectTo: 'auth' }, // Redirige a auth para rutas no encontradas
];
