import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { DetallePedidoDetailComponent } from 'app/entities/detalle-pedido/detalle-pedido-detail.component';
import { DetallePedido } from 'app/shared/model/detalle-pedido.model';

describe('Component Tests', () => {
  describe('DetallePedido Management Detail Component', () => {
    let comp: DetallePedidoDetailComponent;
    let fixture: ComponentFixture<DetallePedidoDetailComponent>;
    const route = ({ data: of({ detallePedido: new DetallePedido(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [DetallePedidoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DetallePedidoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetallePedidoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detallePedido).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
