import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

/**
 * Servidor SSR híbrido:
 * - En Netlify: la plataforma llama a `netlifyAppEngineHandler` (no se levanta ningún servidor).
 * - En local / Node (`npm run serve:ssr:pokemonSsr`): se levanta un servidor Express.
 */

// Se crea bajo demanda para que importar este módulo no requiera el manifiesto todavía
let angularAppEngine: AngularAppEngine | undefined;

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  angularAppEngine ??= new AngularAppEngine();
  const context = getContext();

  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);

/**
 * Arranca un servidor Express cuando el archivo se ejecuta directamente con Node.
 * Los módulos de Node se importan dinámicamente para no cargarlos en Netlify.
 */
async function startNodeServer(): Promise<void> {
  const { AngularNodeAppEngine, isMainModule, writeResponseToNodeResponse } = await import('@angular/ssr/node');

  if (!isMainModule(import.meta.url) && !process.env['pm_id']) {
    return;
  }

  const { default: express } = await import('express');
  const { join } = await import('node:path');

  const browserDistFolder = join(import.meta.dirname, '../browser');
  const app = express();
  const angularNodeAppEngine = new AngularNodeAppEngine();

  // Archivos estáticos (JS, CSS, imágenes y páginas prerenderizadas)
  app.use(
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
      redirect: false,
    }),
  );

  // El resto de peticiones las renderiza Angular en el servidor
  app.use((req, res, next) => {
    angularNodeAppEngine
      .handle(req)
      .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
      .catch(next);
  });

  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// `Netlify` solo existe como global dentro del runtime de Netlify
if (typeof (globalThis as { Netlify?: unknown }).Netlify === 'undefined' && typeof process !== 'undefined') {
  startNodeServer();
}
