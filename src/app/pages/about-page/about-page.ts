import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MetatagsService } from '../../shared/service/metatags.service';

/**
 * AboutPage Component
 * 
 * Displays information about the Pokemon SSR application.
 * This component uses OnPush change detection strategy for optimal performance.
 * 
 * @component
 * @example
 * // Basic usage
 * <app-about-page></app-about-page>
 */
/**
 * Componente de página "Acerca de"
 * 
 * Componente standalone de Angular que representa la página de información general de la aplicación.
 * Utiliza la estrategia de detección de cambios OnPush para optimizar el rendimiento.
 * 
 * @component
 * @selector app-about-page
 * @templateUrl ./about-page.html
 * @styleUrl ./about-page.scss
 * @changeDetection ChangeDetectionStrategy.OnPush - Estrategia de detección de cambios optimizada
 * 
 * @example
 * // Uso del componente
 * <app-about-page></app-about-page>
 */
/**
 * About page component that displays information about the application.
 * 
 * This component uses OnPush change detection strategy for optimal performance.
 * It serves as the about section of the application, providing users with relevant
 * information about the Pokemon SSR application.
 * 
 * @component
 * @example
 * <app-about-page></app-about-page>
 */
@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // esto es zoneless, que basicamente significa que no se utiliza Zone.js para la detección de cambios, lo que puede mejorar el rendimiento en aplicaciones grandes.
  // mas claro significa que el componente no depende de Zone.js para la detección de cambios, se actualiza solo cuando sus inputs cambian o cuando se dispara un evento dentro del componente, lo que puede mejorar el rendimiento en aplicaciones grandes.
  imports: [],
})
export class AboutPage implements OnInit {

  private _metatagsService = inject(MetatagsService);

  ngOnInit(): void {
    this._metatagsService.setTitle('About - Pokemon SSR');
    this._metatagsService.setMetaTags({ name: 'description', content: 'Learn more about the Pokemon SSR application, its features, and the team behind it.' });
    this._metatagsService.setMetaTags({ name: 'keywords', content: 'Pokemon, SSR, Angular, About, Information' });
    this._metatagsService.setMetaTags({ name: 'author', content: 'Your Name or Company' });
    this._metatagsService.setMetaTags({ name: 'og:title', content: 'About - Pokemon SSR' });
  }

}
