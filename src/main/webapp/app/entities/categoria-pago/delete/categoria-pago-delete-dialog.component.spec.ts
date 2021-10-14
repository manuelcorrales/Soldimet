jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CategoriaPagoService } from '../service/categoria-pago.service';

import { CategoriaPagoDeleteDialogComponent } from './categoria-pago-delete-dialog.component';

describe('Component Tests', () => {
  describe('CategoriaPago Management Delete Component', () => {
    let comp: CategoriaPagoDeleteDialogComponent;
    let fixture: ComponentFixture<CategoriaPagoDeleteDialogComponent>;
    let service: CategoriaPagoService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CategoriaPagoDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(CategoriaPagoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CategoriaPagoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CategoriaPagoService);
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
