import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadChildren: () => import('./pages/about-page/about-page.routes')
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact-page/contact.routes')
  },
  {
    path: 'pricing',
    loadChildren: () => import('./pages/pricing-page/pricing.routes')
  },
  {
    path: 'pokemons',
    loadChildren: () => import('./pages/pokemons/pokemons.routes')
  },
  {
    path: 'pokemon-detail/:id',
    loadChildren: () => import('./pages/pokemon-id/pokemon-id.routes')
  },
  {
    path: '**',
    redirectTo: 'about' //or
    // redirectTo: () => {
        
    //     // const service= inject(Router);

    //     return 'about';
    // }

  }
];