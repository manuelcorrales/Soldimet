import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CategoriaPagoService } from '../service/categoria-pago.service';

import { CategoriaPagoComponent } from './categoria-pago.component';

describe('Component Tests', () => {
  describe('CategoriaPago Management Component', () => {
    let comp: CategoriaPagoComponent;
    let fixture: ComponentFixture<CategoriaPagoComponent>;
    let service: CategoriaPagoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CategoriaPagoComponent],
      })
        .overrideTemplate(CategoriaPagoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoriaPagoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CategoriaPagoService);

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
      expect(comp.categoriaPagos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
