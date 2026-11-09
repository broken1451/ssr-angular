import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pokemon-id').then(m => m.PokemonId),
    pathMatch: 'full',

  }
];

export default routes;
