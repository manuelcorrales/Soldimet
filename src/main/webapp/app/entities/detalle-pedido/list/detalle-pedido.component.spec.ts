import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DetallePedidoService } from '../service/detalle-pedido.service';

import { DetallePedidoComponent } from './detalle-pedido.component';

describe('Component Tests', () => {
  describe('DetallePedido Management Component', () => {
    let comp: DetallePedidoComponent;
    let fixture: ComponentFixture<DetallePedidoComponent>;
    let service: DetallePedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DetallePedidoComponent],
      })
        .overrideTemplate(DetallePedidoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetallePedidoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(DetallePedidoService);

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
      expect(comp.detallePedidos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
