import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { MovimientoArticuloComponent } from 'app/entities/movimiento-articulo/movimiento-articulo.component';
import { MovimientoArticuloService } from 'app/entities/movimiento-articulo/movimiento-articulo.service';
import { MovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';

describe('Component Tests', () => {
  describe('MovimientoArticulo Management Component', () => {
    let comp: MovimientoArticuloComponent;
    let fixture: ComponentFixture<MovimientoArticuloComponent>;
    let service: MovimientoArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MovimientoArticuloComponent],
        providers: []
      })
        .overrideTemplate(MovimientoArticuloComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoArticuloComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MovimientoArticuloService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MovimientoArticulo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.movimientoArticulos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
