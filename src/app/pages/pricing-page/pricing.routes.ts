import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pricing-page').then(m => m.PricingPage),
    pathMatch: 'full',

  }
];

export default routes;
