import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MovimientoPedidoService } from '../service/movimiento-pedido.service';

import { MovimientoPedidoComponent } from './movimiento-pedido.component';

describe('Component Tests', () => {
  describe('MovimientoPedido Management Component', () => {
    let comp: MovimientoPedidoComponent;
    let fixture: ComponentFixture<MovimientoPedidoComponent>;
    let service: MovimientoPedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MovimientoPedidoComponent],
      })
        .overrideTemplate(MovimientoPedidoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoPedidoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MovimientoPedidoService);

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
      expect(comp.movimientoPedidos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
