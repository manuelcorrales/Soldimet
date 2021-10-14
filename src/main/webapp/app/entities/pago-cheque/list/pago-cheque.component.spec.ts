import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PagoChequeService } from '../service/pago-cheque.service';

import { PagoChequeComponent } from './pago-cheque.component';

describe('Component Tests', () => {
  describe('PagoCheque Management Component', () => {
    let comp: PagoChequeComponent;
    let fixture: ComponentFixture<PagoChequeComponent>;
    let service: PagoChequeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PagoChequeComponent],
      })
        .overrideTemplate(PagoChequeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagoChequeComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PagoChequeService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pagoCheques?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
