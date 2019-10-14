import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoPresupuestoComponent } from 'app/entities/estado-presupuesto/estado-presupuesto.component';
import { EstadoPresupuestoService } from 'app/entities/estado-presupuesto/estado-presupuesto.service';
import { EstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';

describe('Component Tests', () => {
  describe('EstadoPresupuesto Management Component', () => {
    let comp: EstadoPresupuestoComponent;
    let fixture: ComponentFixture<EstadoPresupuestoComponent>;
    let service: EstadoPresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoPresupuestoComponent],
        providers: []
      })
        .overrideTemplate(EstadoPresupuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoPresupuestoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoPresupuestoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EstadoPresupuesto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estadoPresupuestos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
