import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PagoTarjetaService } from '../service/pago-tarjeta.service';

import { PagoTarjetaComponent } from './pago-tarjeta.component';

describe('Component Tests', () => {
  describe('PagoTarjeta Management Component', () => {
    let comp: PagoTarjetaComponent;
    let fixture: ComponentFixture<PagoTarjetaComponent>;
    let service: PagoTarjetaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PagoTarjetaComponent],
      })
        .overrideTemplate(PagoTarjetaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagoTarjetaComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PagoTarjetaService);

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
      expect(comp.pagoTarjetas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
