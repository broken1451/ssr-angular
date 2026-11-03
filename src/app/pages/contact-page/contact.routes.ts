import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./contact-page').then(m => m.ContactPage),
    pathMatch: 'full',

  }
];

export default routes;
