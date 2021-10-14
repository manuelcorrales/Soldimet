import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PedidoRepuestoDetailComponent } from './pedido-repuesto-detail.component';

describe('Component Tests', () => {
  describe('PedidoRepuesto Management Detail Component', () => {
    let comp: PedidoRepuestoDetailComponent;
    let fixture: ComponentFixture<PedidoRepuestoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PedidoRepuestoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ pedidoRepuesto: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(PedidoRepuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PedidoRepuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pedidoRepuesto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pedidoRepuesto).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
