import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { PagoEfectivoDeleteDialogComponent } from 'app/entities/pago-efectivo/pago-efectivo-delete-dialog.component';
import { PagoEfectivoService } from 'app/entities/pago-efectivo/pago-efectivo.service';

describe('Component Tests', () => {
  describe('PagoEfectivo Management Delete Component', () => {
    let comp: PagoEfectivoDeleteDialogComponent;
    let fixture: ComponentFixture<PagoEfectivoDeleteDialogComponent>;
    let service: PagoEfectivoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [PagoEfectivoDeleteDialogComponent]
      })
        .overrideTemplate(PagoEfectivoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagoEfectivoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagoEfectivoService);
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
