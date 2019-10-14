import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoMovimientoComponent } from 'app/entities/estado-movimiento/estado-movimiento.component';
import { EstadoMovimientoService } from 'app/entities/estado-movimiento/estado-movimiento.service';
import { EstadoMovimiento } from 'app/shared/model/estado-movimiento.model';

describe('Component Tests', () => {
  describe('EstadoMovimiento Management Component', () => {
    let comp: EstadoMovimientoComponent;
    let fixture: ComponentFixture<EstadoMovimientoComponent>;
    let service: EstadoMovimientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoMovimientoComponent],
        providers: []
      })
        .overrideTemplate(EstadoMovimientoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoMovimientoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoMovimientoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EstadoMovimiento(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estadoMovimientos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
