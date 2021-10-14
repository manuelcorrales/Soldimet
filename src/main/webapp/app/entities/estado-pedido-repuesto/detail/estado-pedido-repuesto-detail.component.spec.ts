import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EstadoPedidoRepuestoDetailComponent } from './estado-pedido-repuesto-detail.component';

describe('Component Tests', () => {
  describe('EstadoPedidoRepuesto Management Detail Component', () => {
    let comp: EstadoPedidoRepuestoDetailComponent;
    let fixture: ComponentFixture<EstadoPedidoRepuestoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EstadoPedidoRepuestoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ estadoPedidoRepuesto: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(EstadoPedidoRepuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoPedidoRepuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estadoPedidoRepuesto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoPedidoRepuesto).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
