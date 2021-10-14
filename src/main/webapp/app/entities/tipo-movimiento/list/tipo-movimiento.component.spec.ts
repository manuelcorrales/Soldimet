import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TipoMovimientoService } from '../service/tipo-movimiento.service';

import { TipoMovimientoComponent } from './tipo-movimiento.component';

describe('Component Tests', () => {
  describe('TipoMovimiento Management Component', () => {
    let comp: TipoMovimientoComponent;
    let fixture: ComponentFixture<TipoMovimientoComponent>;
    let service: TipoMovimientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TipoMovimientoComponent],
      })
        .overrideTemplate(TipoMovimientoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoMovimientoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TipoMovimientoService);

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
      expect(comp.tipoMovimientos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
