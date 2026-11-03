import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./about-page').then(m => m.AboutPage),
    pathMatch: 'full',

  }
];

export default routes;
