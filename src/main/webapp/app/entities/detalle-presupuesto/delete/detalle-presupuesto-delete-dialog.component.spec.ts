jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DetallePresupuestoService } from '../service/detalle-presupuesto.service';

import { DetallePresupuestoDeleteDialogComponent } from './detalle-presupuesto-delete-dialog.component';

describe('Component Tests', () => {
  describe('DetallePresupuesto Management Delete Component', () => {
    let comp: DetallePresupuestoDeleteDialogComponent;
    let fixture: ComponentFixture<DetallePresupuestoDeleteDialogComponent>;
    let service: DetallePresupuestoService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DetallePresupuestoDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(DetallePresupuestoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetallePresupuestoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(DetallePresupuestoService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({})));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        jest.spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
