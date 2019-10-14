import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { LocalidadDeleteDialogComponent } from 'app/entities/localidad/localidad-delete-dialog.component';
import { LocalidadService } from 'app/entities/localidad/localidad.service';

describe('Component Tests', () => {
  describe('Localidad Management Delete Component', () => {
    let comp: LocalidadDeleteDialogComponent;
    let fixture: ComponentFixture<LocalidadDeleteDialogComponent>;
    let service: LocalidadService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [LocalidadDeleteDialogComponent]
      })
        .overrideTemplate(LocalidadDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalidadDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalidadService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
