import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DetallePresupuestoService } from '../service/detalle-presupuesto.service';

import { DetallePresupuestoComponent } from './detalle-presupuesto.component';

describe('Component Tests', () => {
  describe('DetallePresupuesto Management Component', () => {
    let comp: DetallePresupuestoComponent;
    let fixture: ComponentFixture<DetallePresupuestoComponent>;
    let service: DetallePresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DetallePresupuestoComponent],
      })
        .overrideTemplate(DetallePresupuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetallePresupuestoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(DetallePresupuestoService);

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
      expect(comp.detallePresupuestos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
