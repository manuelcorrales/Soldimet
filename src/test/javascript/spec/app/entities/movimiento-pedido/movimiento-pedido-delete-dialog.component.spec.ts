import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { MovimientoPedidoDeleteDialogComponent } from 'app/entities/movimiento-pedido/movimiento-pedido-delete-dialog.component';
import { MovimientoPedidoService } from 'app/entities/movimiento-pedido/movimiento-pedido.service';

describe('Component Tests', () => {
  describe('MovimientoPedido Management Delete Component', () => {
    let comp: MovimientoPedidoDeleteDialogComponent;
    let fixture: ComponentFixture<MovimientoPedidoDeleteDialogComponent>;
    let service: MovimientoPedidoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MovimientoPedidoDeleteDialogComponent]
      })
        .overrideTemplate(MovimientoPedidoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MovimientoPedidoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MovimientoPedidoService);
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
