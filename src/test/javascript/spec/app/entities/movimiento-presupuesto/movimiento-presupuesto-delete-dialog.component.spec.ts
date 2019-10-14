import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { MovimientoPresupuestoDeleteDialogComponent } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto-delete-dialog.component';
import { MovimientoPresupuestoService } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto.service';

describe('Component Tests', () => {
  describe('MovimientoPresupuesto Management Delete Component', () => {
    let comp: MovimientoPresupuestoDeleteDialogComponent;
    let fixture: ComponentFixture<MovimientoPresupuestoDeleteDialogComponent>;
    let service: MovimientoPresupuestoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MovimientoPresupuestoDeleteDialogComponent]
      })
        .overrideTemplate(MovimientoPresupuestoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MovimientoPresupuestoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MovimientoPresupuestoService);
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
