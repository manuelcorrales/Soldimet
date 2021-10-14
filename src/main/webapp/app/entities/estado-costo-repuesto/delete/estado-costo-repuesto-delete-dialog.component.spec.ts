jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EstadoCostoRepuestoService } from '../service/estado-costo-repuesto.service';

import { EstadoCostoRepuestoDeleteDialogComponent } from './estado-costo-repuesto-delete-dialog.component';

describe('Component Tests', () => {
  describe('EstadoCostoRepuesto Management Delete Component', () => {
    let comp: EstadoCostoRepuestoDeleteDialogComponent;
    let fixture: ComponentFixture<EstadoCostoRepuestoDeleteDialogComponent>;
    let service: EstadoCostoRepuestoService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoCostoRepuestoDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(EstadoCostoRepuestoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoCostoRepuestoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EstadoCostoRepuestoService);
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
