import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EstadoPresupuestoService } from '../service/estado-presupuesto.service';

import { EstadoPresupuestoComponent } from './estado-presupuesto.component';

describe('Component Tests', () => {
  describe('EstadoPresupuesto Management Component', () => {
    let comp: EstadoPresupuestoComponent;
    let fixture: ComponentFixture<EstadoPresupuestoComponent>;
    let service: EstadoPresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoPresupuestoComponent],
      })
        .overrideTemplate(EstadoPresupuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoPresupuestoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EstadoPresupuestoService);

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
      expect(comp.estadoPresupuestos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
