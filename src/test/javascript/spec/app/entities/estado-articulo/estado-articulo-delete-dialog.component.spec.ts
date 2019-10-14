import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoArticuloDeleteDialogComponent } from 'app/entities/estado-articulo/estado-articulo-delete-dialog.component';
import { EstadoArticuloService } from 'app/entities/estado-articulo/estado-articulo.service';

describe('Component Tests', () => {
  describe('EstadoArticulo Management Delete Component', () => {
    let comp: EstadoArticuloDeleteDialogComponent;
    let fixture: ComponentFixture<EstadoArticuloDeleteDialogComponent>;
    let service: EstadoArticuloService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoArticuloDeleteDialogComponent]
      })
        .overrideTemplate(EstadoArticuloDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoArticuloDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoArticuloService);
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
