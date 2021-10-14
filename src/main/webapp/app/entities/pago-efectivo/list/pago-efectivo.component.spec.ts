import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PagoEfectivoService } from '../service/pago-efectivo.service';

import { PagoEfectivoComponent } from './pago-efectivo.component';

describe('Component Tests', () => {
  describe('PagoEfectivo Management Component', () => {
    let comp: PagoEfectivoComponent;
    let fixture: ComponentFixture<PagoEfectivoComponent>;
    let service: PagoEfectivoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PagoEfectivoComponent],
      })
        .overrideTemplate(PagoEfectivoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagoEfectivoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PagoEfectivoService);

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
      expect(comp.pagoEfectivos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
