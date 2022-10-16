import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TranslateModule,
  TranslateService,
  TranslocoHttpLoader,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
} from '@ibl-test-task/translate';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PageComponent } from './components/page.component';
import { MainLibComponent } from './main-lib.component';
import { ApiService } from './services/api.service';

export function translocoConfigFactory() {
  const availableLangs = ['en'];
  const defaultLang = 'en';

  return {
    availableLangs,
    defaultLang,
    reRenderOnLangChange: true,
  };
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    TranslateModule,
  ],
  declarations: [MainLibComponent, PageComponent],
  exports: [MainLibComponent],
  providers: [
    ApiService,
    {
      provide: TRANSLOCO_CONFIG,
      useFactory: translocoConfigFactory,
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    TranslateService,
  ],
})
export class MainLibModule {}
