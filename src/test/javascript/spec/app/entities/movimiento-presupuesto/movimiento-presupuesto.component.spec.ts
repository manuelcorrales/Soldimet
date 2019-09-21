import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { MovimientoPresupuestoComponent } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto.component';
import { MovimientoPresupuestoService } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto.service';
import { MovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';

describe('Component Tests', () => {
  describe('MovimientoPresupuesto Management Component', () => {
    let comp: MovimientoPresupuestoComponent;
    let fixture: ComponentFixture<MovimientoPresupuestoComponent>;
    let service: MovimientoPresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MovimientoPresupuestoComponent],
        providers: []
      })
        .overrideTemplate(MovimientoPresupuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoPresupuestoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MovimientoPresupuestoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MovimientoPresupuesto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.movimientoPresupuestos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
