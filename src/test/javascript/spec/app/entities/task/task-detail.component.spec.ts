import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { TaskDetailComponent } from 'app/entities/task/task-detail.component';
import { Task } from 'app/shared/model/task.model';

describe('Component Tests', () => {
  describe('Task Management Detail Component', () => {
    let comp: TaskDetailComponent;
    let fixture: ComponentFixture<TaskDetailComponent>;
    let dataUtils: JhiDataUtils;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TaskDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ task: new Task(123) }) },
          },
        ],
      })
        .overrideTemplate(TaskDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TaskDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = TestBed.inject(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load task on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.task).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
