import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EstadoDetallePedidoService } from '../service/estado-detalle-pedido.service';

import { EstadoDetallePedidoComponent } from './estado-detalle-pedido.component';

describe('Component Tests', () => {
  describe('EstadoDetallePedido Management Component', () => {
    let comp: EstadoDetallePedidoComponent;
    let fixture: ComponentFixture<EstadoDetallePedidoComponent>;
    let service: EstadoDetallePedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoDetallePedidoComponent],
      })
        .overrideTemplate(EstadoDetallePedidoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoDetallePedidoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EstadoDetallePedidoService);

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
      expect(comp.estadoDetallePedidos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
