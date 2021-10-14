import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DetallePedidoDetailComponent } from './detalle-pedido-detail.component';

describe('Component Tests', () => {
  describe('DetallePedido Management Detail Component', () => {
    let comp: DetallePedidoDetailComponent;
    let fixture: ComponentFixture<DetallePedidoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DetallePedidoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ detallePedido: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(DetallePedidoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetallePedidoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load detallePedido on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detallePedido).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
