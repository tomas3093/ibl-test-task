import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { merge, of } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class TranslateService {
  constructor(private translateService: TranslocoService) {
    this.translateService.langChanges$.pipe(first()).subscribe();
  }

  get currentLang() {
    return merge(
      of(this.translateService.getActiveLang()),
      this.translateService.langChanges$
    );
  }

  get availableLangs() {
    return this.translateService.getAvailableLangs();
  }

  instant(key: string | Array<string>, interpolateParams?: any): string {
    return this.translateService.translate(key, interpolateParams);
  }

  stream(key: string | string[], interpolateParams?: any) {
    return this.translateService.selectTranslate(key, interpolateParams);
  }
}
