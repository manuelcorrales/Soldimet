import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MedioDePagoChequeService } from '../service/medio-de-pago-cheque.service';

import { MedioDePagoChequeComponent } from './medio-de-pago-cheque.component';

describe('Component Tests', () => {
  describe('MedioDePagoCheque Management Component', () => {
    let comp: MedioDePagoChequeComponent;
    let fixture: ComponentFixture<MedioDePagoChequeComponent>;
    let service: MedioDePagoChequeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MedioDePagoChequeComponent],
      })
        .overrideTemplate(MedioDePagoChequeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedioDePagoChequeComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MedioDePagoChequeService);

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
      expect(comp.medioDePagoCheques?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
