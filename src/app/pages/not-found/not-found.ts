import { Component, inject, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetatagsService } from '../../shared/service/metatags.service';

@Component({
  imports: [RouterLink, NgOptimizedImage],
  selector: 'app-not-found',
  styleUrl: './not-found.scss',
  templateUrl: './not-found.html',
})
export class NotFound implements OnInit {

  private _metatagsService = inject(MetatagsService);

  ngOnInit(): void {
    this._metatagsService.setTitle('404 - Pokemon SSR');
    this._metatagsService.setMetaTags({ name: 'description', content: 'La página que buscas no existe.' });
    // Evita que los buscadores indexen páginas inexistentes
    this._metatagsService.setMetaTags({ name: 'robots', content: 'noindex' });
  }

}
