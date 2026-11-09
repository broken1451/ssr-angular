import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pokemons').then(m => m.Pokemons),
    pathMatch: 'full',

  }
];

export default routes;
