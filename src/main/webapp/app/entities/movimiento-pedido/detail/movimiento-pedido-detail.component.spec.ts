import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MovimientoPedidoDetailComponent } from './movimiento-pedido-detail.component';

describe('Component Tests', () => {
  describe('MovimientoPedido Management Detail Component', () => {
    let comp: MovimientoPedidoDetailComponent;
    let fixture: ComponentFixture<MovimientoPedidoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MovimientoPedidoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ movimientoPedido: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MovimientoPedidoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MovimientoPedidoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load movimientoPedido on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.movimientoPedido).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
