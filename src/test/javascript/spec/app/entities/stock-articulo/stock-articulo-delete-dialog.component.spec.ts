import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { StockArticuloDeleteDialogComponent } from 'app/entities/stock-articulo/stock-articulo-delete-dialog.component';
import { StockArticuloService } from 'app/entities/stock-articulo/stock-articulo.service';

describe('Component Tests', () => {
  describe('StockArticulo Management Delete Component', () => {
    let comp: StockArticuloDeleteDialogComponent;
    let fixture: ComponentFixture<StockArticuloDeleteDialogComponent>;
    let service: StockArticuloService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [StockArticuloDeleteDialogComponent]
      })
        .overrideTemplate(StockArticuloDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StockArticuloDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StockArticuloService);
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
