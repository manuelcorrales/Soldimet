import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EstadoMovimientoService } from '../service/estado-movimiento.service';

import { EstadoMovimientoComponent } from './estado-movimiento.component';

describe('Component Tests', () => {
  describe('EstadoMovimiento Management Component', () => {
    let comp: EstadoMovimientoComponent;
    let fixture: ComponentFixture<EstadoMovimientoComponent>;
    let service: EstadoMovimientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoMovimientoComponent],
      })
        .overrideTemplate(EstadoMovimientoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoMovimientoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EstadoMovimientoService);

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
      expect(comp.estadoMovimientos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
