import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { CostoRepuestoProveedorDeleteDialogComponent } from 'app/entities/costo-repuesto-proveedor/costo-repuesto-proveedor-delete-dialog.component';
import { CostoRepuestoProveedorService } from 'app/entities/costo-repuesto-proveedor/costo-repuesto-proveedor.service';

describe('Component Tests', () => {
  describe('CostoRepuestoProveedor Management Delete Component', () => {
    let comp: CostoRepuestoProveedorDeleteDialogComponent;
    let fixture: ComponentFixture<CostoRepuestoProveedorDeleteDialogComponent>;
    let service: CostoRepuestoProveedorService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CostoRepuestoProveedorDeleteDialogComponent]
      })
        .overrideTemplate(CostoRepuestoProveedorDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CostoRepuestoProveedorDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CostoRepuestoProveedorService);
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
