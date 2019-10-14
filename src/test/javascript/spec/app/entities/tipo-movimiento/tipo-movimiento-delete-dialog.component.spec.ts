import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { TipoMovimientoDeleteDialogComponent } from 'app/entities/tipo-movimiento/tipo-movimiento-delete-dialog.component';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento/tipo-movimiento.service';

describe('Component Tests', () => {
  describe('TipoMovimiento Management Delete Component', () => {
    let comp: TipoMovimientoDeleteDialogComponent;
    let fixture: ComponentFixture<TipoMovimientoDeleteDialogComponent>;
    let service: TipoMovimientoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [TipoMovimientoDeleteDialogComponent]
      })
        .overrideTemplate(TipoMovimientoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoMovimientoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoMovimientoService);
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
