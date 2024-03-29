import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoCostoRepuestoDeleteDialogComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto-delete-dialog.component';
import { EstadoCostoRepuestoService } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.service';

describe('Component Tests', () => {
  describe('EstadoCostoRepuesto Management Delete Component', () => {
    let comp: EstadoCostoRepuestoDeleteDialogComponent;
    let fixture: ComponentFixture<EstadoCostoRepuestoDeleteDialogComponent>;
    let service: EstadoCostoRepuestoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoCostoRepuestoDeleteDialogComponent]
      })
        .overrideTemplate(EstadoCostoRepuestoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoCostoRepuestoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoCostoRepuestoService);
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
