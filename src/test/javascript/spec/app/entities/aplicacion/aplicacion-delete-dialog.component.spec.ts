import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { AplicacionDeleteDialogComponent } from 'app/entities/aplicacion/aplicacion-delete-dialog.component';
import { AplicacionService } from 'app/entities/aplicacion/aplicacion.service';

describe('Component Tests', () => {
  describe('Aplicacion Management Delete Component', () => {
    let comp: AplicacionDeleteDialogComponent;
    let fixture: ComponentFixture<AplicacionDeleteDialogComponent>;
    let service: AplicacionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [AplicacionDeleteDialogComponent]
      })
        .overrideTemplate(AplicacionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AplicacionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AplicacionService);
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
