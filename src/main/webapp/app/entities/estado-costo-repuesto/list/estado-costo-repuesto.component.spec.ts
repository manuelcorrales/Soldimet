import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EstadoCostoRepuestoService } from '../service/estado-costo-repuesto.service';

import { EstadoCostoRepuestoComponent } from './estado-costo-repuesto.component';

describe('Component Tests', () => {
  describe('EstadoCostoRepuesto Management Component', () => {
    let comp: EstadoCostoRepuestoComponent;
    let fixture: ComponentFixture<EstadoCostoRepuestoComponent>;
    let service: EstadoCostoRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoCostoRepuestoComponent],
      })
        .overrideTemplate(EstadoCostoRepuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoCostoRepuestoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EstadoCostoRepuestoService);

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
      expect(comp.estadoCostoRepuestos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
