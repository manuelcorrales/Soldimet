import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { MedidaArticuloDeleteDialogComponent } from 'app/entities/medida-articulo/medida-articulo-delete-dialog.component';
import { MedidaArticuloService } from 'app/entities/medida-articulo/medida-articulo.service';

describe('Component Tests', () => {
  describe('MedidaArticulo Management Delete Component', () => {
    let comp: MedidaArticuloDeleteDialogComponent;
    let fixture: ComponentFixture<MedidaArticuloDeleteDialogComponent>;
    let service: MedidaArticuloService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MedidaArticuloDeleteDialogComponent]
      })
        .overrideTemplate(MedidaArticuloDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedidaArticuloDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedidaArticuloService);
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
