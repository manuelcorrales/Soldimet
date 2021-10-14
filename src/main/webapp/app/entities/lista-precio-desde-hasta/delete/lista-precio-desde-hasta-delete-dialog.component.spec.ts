jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ListaPrecioDesdeHastaService } from '../service/lista-precio-desde-hasta.service';

import { ListaPrecioDesdeHastaDeleteDialogComponent } from './lista-precio-desde-hasta-delete-dialog.component';

describe('Component Tests', () => {
  describe('ListaPrecioDesdeHasta Management Delete Component', () => {
    let comp: ListaPrecioDesdeHastaDeleteDialogComponent;
    let fixture: ComponentFixture<ListaPrecioDesdeHastaDeleteDialogComponent>;
    let service: ListaPrecioDesdeHastaService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ListaPrecioDesdeHastaDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(ListaPrecioDesdeHastaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ListaPrecioDesdeHastaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ListaPrecioDesdeHastaService);
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
