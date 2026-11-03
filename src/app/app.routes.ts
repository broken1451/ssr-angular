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
    path: '**',
    redirectTo: 'about' //or
    // redirectTo: () => {
        
    //     // const service= inject(Router);

    //     return 'about';
    // }

  }
];