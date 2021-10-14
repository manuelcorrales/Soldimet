jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PedidoRepuestoService } from '../service/pedido-repuesto.service';

import { PedidoRepuestoDeleteDialogComponent } from './pedido-repuesto-delete-dialog.component';

describe('Component Tests', () => {
  describe('PedidoRepuesto Management Delete Component', () => {
    let comp: PedidoRepuestoDeleteDialogComponent;
    let fixture: ComponentFixture<PedidoRepuestoDeleteDialogComponent>;
    let service: PedidoRepuestoService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PedidoRepuestoDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(PedidoRepuestoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PedidoRepuestoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PedidoRepuestoService);
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
