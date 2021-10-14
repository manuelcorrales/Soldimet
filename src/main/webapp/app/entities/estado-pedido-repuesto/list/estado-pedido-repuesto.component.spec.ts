import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EstadoPedidoRepuestoService } from '../service/estado-pedido-repuesto.service';

import { EstadoPedidoRepuestoComponent } from './estado-pedido-repuesto.component';

describe('Component Tests', () => {
  describe('EstadoPedidoRepuesto Management Component', () => {
    let comp: EstadoPedidoRepuestoComponent;
    let fixture: ComponentFixture<EstadoPedidoRepuestoComponent>;
    let service: EstadoPedidoRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoPedidoRepuestoComponent],
      })
        .overrideTemplate(EstadoPedidoRepuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoPedidoRepuestoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EstadoPedidoRepuestoService);

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
      expect(comp.estadoPedidoRepuestos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
