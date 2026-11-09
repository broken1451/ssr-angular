import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MetatagsService } from '../../shared/service/metatags.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [],
  selector: 'app-pricing-page',
  styleUrl: './pricing-page.scss',
  templateUrl: './pricing-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingPage implements OnInit {

  private _metatagsService = inject(MetatagsService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    // document.title = 'Pricing - Pokemon SSR';
    if(isPlatformBrowser(this.platformId)){
      document.title = 'Pricing - Pokemon SSR';
      // console.log({document});  

    } else {

      this._metatagsService.setTitle('Pricing - Pokemon SSR');
      this._metatagsService.setMetaTags({ name: 'description', content: 'Learn more about the Pokemon SSR application, its features, and the team behind it.' });
      this._metatagsService.setMetaTags({ name: 'keywords', content: 'Pokemon, SSR, Angular, Pricing, Information' });
      this._metatagsService.setMetaTags({ name: 'author', content: 'Your Name or Company' });
      this._metatagsService.setMetaTags({ name: 'og:title', content: 'Pricing - Pokemon SSR' });
    }

  }

}
