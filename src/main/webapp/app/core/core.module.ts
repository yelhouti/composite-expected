import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/en';
import { Title } from '@angular/platform-browser';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule, translatePartialLoader, missingTranslationHandler, JhiConfigService, JhiLanguageService } from 'ng-jhipster';
import * as dayjs from 'dayjs';
import { NgbDateAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateDayjsAdapter } from 'app/core/config/datepicker-adapter';
import { fontAwesomeIcons } from 'app/core/config/font-awesome-icons';
import { httpInterceptorProviders } from './interceptor/index';

@NgModule({
  imports: [
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000,
      i18nEnabled: true,
      defaultI18nLang: 'en',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translatePartialLoader,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: missingTranslationHandler,
        deps: [JhiConfigService],
      },
    }),
  ],
  providers: [
    Title,
    CookieService,
    {
      provide: LOCALE_ID,
      useValue: 'en',
    },
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
    DatePipe,
    httpInterceptorProviders,
  ],
})
export class CoreModule {
  constructor(iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig, languageService: JhiLanguageService) {
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
    languageService.init();
  }
}
