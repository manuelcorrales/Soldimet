import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TipoDetalleMovimientoService } from '../service/tipo-detalle-movimiento.service';

import { TipoDetalleMovimientoComponent } from './tipo-detalle-movimiento.component';

describe('Component Tests', () => {
  describe('TipoDetalleMovimiento Management Component', () => {
    let comp: TipoDetalleMovimientoComponent;
    let fixture: ComponentFixture<TipoDetalleMovimientoComponent>;
    let service: TipoDetalleMovimientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TipoDetalleMovimientoComponent],
      })
        .overrideTemplate(TipoDetalleMovimientoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoDetalleMovimientoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TipoDetalleMovimientoService);

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
      expect(comp.tipoDetalleMovimientos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
