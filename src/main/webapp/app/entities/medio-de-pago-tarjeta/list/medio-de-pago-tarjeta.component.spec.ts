import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MedioDePagoTarjetaService } from '../service/medio-de-pago-tarjeta.service';

import { MedioDePagoTarjetaComponent } from './medio-de-pago-tarjeta.component';

describe('Component Tests', () => {
  describe('MedioDePagoTarjeta Management Component', () => {
    let comp: MedioDePagoTarjetaComponent;
    let fixture: ComponentFixture<MedioDePagoTarjetaComponent>;
    let service: MedioDePagoTarjetaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MedioDePagoTarjetaComponent],
      })
        .overrideTemplate(MedioDePagoTarjetaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedioDePagoTarjetaComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MedioDePagoTarjetaService);

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
      expect(comp.medioDePagoTarjetas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
