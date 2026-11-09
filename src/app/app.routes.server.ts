import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

const TOTAL_POKEMONS_TO_PRERENDER = 10;

export const serverRoutes: ServerRoute[] = [
  // Redirección '' -> 'about' (no puede caer en '**' porque una redirección no admite status 404)
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'pricing', renderMode: RenderMode.Prerender },
  { path: 'pokemons', renderMode: RenderMode.Prerender },
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
    // La página NotFound se renderiza en el servidor con estado HTTP 404
    path: 'not-found',
    renderMode: RenderMode.Server,
    status: 404,
  },
  {
    // Rutas desconocidas: redirigen a 'not-found' (una redirección no admite status 404)
    path: '**',
    renderMode: RenderMode.Server,
  },
];
