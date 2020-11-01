import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateDirective } from 'app/shared/translate.directive';
import { Component } from '@angular/core';

@Component({
  template: ` <div jhiTranslate="test"></div> `,
})
class TestTranslateDirectiveComponent {}

describe('TranslateDirective Tests', () => {
  let fixture: ComponentFixture<TestTranslateDirectiveComponent>;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [TranslateDirective, TestTranslateDirectiveComponent],
    });
  }));

  beforeEach(() => {
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(TestTranslateDirectiveComponent);
  });

  it('should change HTML', () => {
    const spy = spyOn(translateService, 'get').and.callThrough();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
