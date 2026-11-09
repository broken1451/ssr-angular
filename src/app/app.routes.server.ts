import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

const TOTAL_POKEMONS_TO_PRERENDER = 10;

export const serverRoutes: ServerRoute[] = [
  {
    // Las rutas con parámetros necesitan saber qué ids generar en el build
    path: 'pokemon-detail/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return Array.from({ length: TOTAL_POKEMONS_TO_PRERENDER }, (_, i) => ({ id: `${i + 1}` }));
    },
    // Los ids que no se prerenderizan se renderizan en el servidor bajo demanda
    fallback: PrerenderFallback.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
