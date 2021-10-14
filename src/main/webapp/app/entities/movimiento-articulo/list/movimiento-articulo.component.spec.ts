import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MovimientoArticuloService } from '../service/movimiento-articulo.service';

import { MovimientoArticuloComponent } from './movimiento-articulo.component';

describe('Component Tests', () => {
  describe('MovimientoArticulo Management Component', () => {
    let comp: MovimientoArticuloComponent;
    let fixture: ComponentFixture<MovimientoArticuloComponent>;
    let service: MovimientoArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MovimientoArticuloComponent],
      })
        .overrideTemplate(MovimientoArticuloComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoArticuloComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MovimientoArticuloService);

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
      expect(comp.movimientoArticulos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
