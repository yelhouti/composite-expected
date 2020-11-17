jest.mock('ng-jhipster');

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { JhiAlertService } from 'ng-jhipster';

import { AlertComponent } from 'app/shared/alert/alert.component';

describe('Component Tests', () => {
  describe('Alert Component', () => {
    let comp: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;
    let mockAlertService: JhiAlertService;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [AlertComponent],
          providers: [JhiAlertService],
        })
          .overrideTemplate(AlertComponent, '')
          .compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(AlertComponent);
      comp = fixture.componentInstance;
      mockAlertService = TestBed.inject(JhiAlertService);
    });

    it('Should call alertService.get on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(mockAlertService.get).toHaveBeenCalled();
    });

    it('Should call alertService.clear on destroy', () => {
      // WHEN
      comp.ngOnDestroy();

      // THEN
      expect(mockAlertService.clear).toHaveBeenCalled();
    });
  });
});
