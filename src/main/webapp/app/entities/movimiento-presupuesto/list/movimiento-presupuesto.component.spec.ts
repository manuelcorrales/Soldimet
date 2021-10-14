import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MovimientoPresupuestoService } from '../service/movimiento-presupuesto.service';

import { MovimientoPresupuestoComponent } from './movimiento-presupuesto.component';

describe('Component Tests', () => {
  describe('MovimientoPresupuesto Management Component', () => {
    let comp: MovimientoPresupuestoComponent;
    let fixture: ComponentFixture<MovimientoPresupuestoComponent>;
    let service: MovimientoPresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MovimientoPresupuestoComponent],
      })
        .overrideTemplate(MovimientoPresupuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoPresupuestoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MovimientoPresupuestoService);

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
      expect(comp.movimientoPresupuestos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
