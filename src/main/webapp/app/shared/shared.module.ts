import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { TranslateDirective } from './language/translate.directive';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { DurationPipe } from './date/duration.pipe';
import { PrimeNGCommonModule } from 'app/shared/primeng-common.module';

@NgModule({
  imports: [SharedLibsModule, PrimeNGCommonModule],
  declarations: [FindLanguageFromKeyPipe, TranslateDirective, HasAnyAuthorityDirective, DurationPipe],
  exports: [SharedLibsModule, FindLanguageFromKeyPipe, TranslateDirective, HasAnyAuthorityDirective, DurationPipe, PrimeNGCommonModule],
})
export class SharedModule {}
