import { inject, Service } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Service()
export class MetatagsService {


    private _title = inject(Title);
    private _meta = inject(Meta);

    setTitle(title: string) {
        this._title.setTitle(title);
    }
    
    setMetaTags(tags: { name: string, content: string }) {
        this._meta.updateTag(tags);
    }

}
