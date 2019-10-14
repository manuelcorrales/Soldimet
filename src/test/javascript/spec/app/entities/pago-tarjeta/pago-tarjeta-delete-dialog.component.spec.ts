import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { PagoTarjetaDeleteDialogComponent } from 'app/entities/pago-tarjeta/pago-tarjeta-delete-dialog.component';
import { PagoTarjetaService } from 'app/entities/pago-tarjeta/pago-tarjeta.service';

describe('Component Tests', () => {
  describe('PagoTarjeta Management Delete Component', () => {
    let comp: PagoTarjetaDeleteDialogComponent;
    let fixture: ComponentFixture<PagoTarjetaDeleteDialogComponent>;
    let service: PagoTarjetaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [PagoTarjetaDeleteDialogComponent]
      })
        .overrideTemplate(PagoTarjetaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagoTarjetaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagoTarjetaService);
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
