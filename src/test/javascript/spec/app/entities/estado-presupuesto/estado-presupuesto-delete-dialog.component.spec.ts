import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoPresupuestoDeleteDialogComponent } from 'app/entities/estado-presupuesto/estado-presupuesto-delete-dialog.component';
import { EstadoPresupuestoService } from 'app/entities/estado-presupuesto/estado-presupuesto.service';

describe('Component Tests', () => {
  describe('EstadoPresupuesto Management Delete Component', () => {
    let comp: EstadoPresupuestoDeleteDialogComponent;
    let fixture: ComponentFixture<EstadoPresupuestoDeleteDialogComponent>;
    let service: EstadoPresupuestoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoPresupuestoDeleteDialogComponent]
      })
        .overrideTemplate(EstadoPresupuestoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoPresupuestoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoPresupuestoService);
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
