import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoDetallePedidoDetailComponent } from 'app/entities/estado-detalle-pedido/estado-detalle-pedido-detail.component';
import { EstadoDetallePedido } from 'app/shared/model/estado-detalle-pedido.model';

describe('Component Tests', () => {
  describe('EstadoDetallePedido Management Detail Component', () => {
    let comp: EstadoDetallePedidoDetailComponent;
    let fixture: ComponentFixture<EstadoDetallePedidoDetailComponent>;
    const route = ({ data: of({ estadoDetallePedido: new EstadoDetallePedido(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoDetallePedidoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EstadoDetallePedidoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoDetallePedidoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoDetallePedido).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
