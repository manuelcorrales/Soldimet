import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { MedioDePagoDeleteDialogComponent } from 'app/entities/medio-de-pago/medio-de-pago-delete-dialog.component';
import { MedioDePagoService } from 'app/entities/medio-de-pago/medio-de-pago.service';

describe('Component Tests', () => {
  describe('MedioDePago Management Delete Component', () => {
    let comp: MedioDePagoDeleteDialogComponent;
    let fixture: ComponentFixture<MedioDePagoDeleteDialogComponent>;
    let service: MedioDePagoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MedioDePagoDeleteDialogComponent]
      })
        .overrideTemplate(MedioDePagoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedioDePagoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedioDePagoService);
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
