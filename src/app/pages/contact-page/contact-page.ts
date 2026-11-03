import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MetatagsService } from '../../shared/service/metatags.service';

@Component({
  imports: [],
  selector: 'app-contact-page',
  styleUrl: './contact-page.scss',
  templateUrl: './contact-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPage implements OnInit {

  private _metatagsService = inject(MetatagsService);

  ngOnInit(): void {
    this._metatagsService.setTitle('Contact - Pokemon SSR');
    this._metatagsService.setMetaTags({ name: 'description', content: 'Learn more about the Pokemon SSR application, its features, and the team behind it.' });
    this._metatagsService.setMetaTags({ name: 'keywords', content: 'Pokemon, SSR, Angular, Contact, Information' });
    this._metatagsService.setMetaTags({ name: 'author', content: 'Your Name or Company' });
    this._metatagsService.setMetaTags({ name: 'og:title', content: 'Contact - Pokemon SSR' });
   }

}
