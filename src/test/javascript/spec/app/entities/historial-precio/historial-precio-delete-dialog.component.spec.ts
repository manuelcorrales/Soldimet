import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { HistorialPrecioDeleteDialogComponent } from 'app/entities/historial-precio/historial-precio-delete-dialog.component';
import { HistorialPrecioService } from 'app/entities/historial-precio/historial-precio.service';

describe('Component Tests', () => {
  describe('HistorialPrecio Management Delete Component', () => {
    let comp: HistorialPrecioDeleteDialogComponent;
    let fixture: ComponentFixture<HistorialPrecioDeleteDialogComponent>;
    let service: HistorialPrecioService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [HistorialPrecioDeleteDialogComponent]
      })
        .overrideTemplate(HistorialPrecioDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistorialPrecioDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistorialPrecioService);
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
