import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

/**
 * Configuración de la aplicación Angular.
 *
 * @remarks
 * Este objeto define los proveedores globales y configuraciones principales de la aplicación.
 *
 * @property {Provider[]} providers - Array de proveedores que incluye:
 * - `provideZoneChangeDetection({eventCoalescing: true})`: Habilita la detección de cambios con coalescencia de eventos,
 *   optimizando el rendimiento al agrupar múltiples eventos de zona en un único ciclo de detección de cambios.
 * - `provideBrowserGlobalErrorListeners()`: Configura los manejadores globales de errores del navegador para capturar
 *   excepciones no capturadas y errores de promesas rechazadas.
 * - `provideRouter(routes)`: Proporciona el enrutador de la aplicación con la configuración de rutas definida.
 *
 * @type {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
  ],
};
