import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { MovimientoPedidoComponent } from 'app/entities/movimiento-pedido/movimiento-pedido.component';
import { MovimientoPedidoService } from 'app/entities/movimiento-pedido/movimiento-pedido.service';
import { MovimientoPedido } from 'app/shared/model/movimiento-pedido.model';

describe('Component Tests', () => {
  describe('MovimientoPedido Management Component', () => {
    let comp: MovimientoPedidoComponent;
    let fixture: ComponentFixture<MovimientoPedidoComponent>;
    let service: MovimientoPedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MovimientoPedidoComponent],
        providers: []
      })
        .overrideTemplate(MovimientoPedidoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoPedidoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MovimientoPedidoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MovimientoPedido(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.movimientoPedidos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
