import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EstadoDetallePedidoDetailComponent } from './estado-detalle-pedido-detail.component';

describe('Component Tests', () => {
  describe('EstadoDetallePedido Management Detail Component', () => {
    let comp: EstadoDetallePedidoDetailComponent;
    let fixture: ComponentFixture<EstadoDetallePedidoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EstadoDetallePedidoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ estadoDetallePedido: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(EstadoDetallePedidoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoDetallePedidoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estadoDetallePedido on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoDetallePedido).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
