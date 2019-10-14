import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoPedidoRepuestoDetailComponent } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto-detail.component';
import { EstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';

describe('Component Tests', () => {
  describe('EstadoPedidoRepuesto Management Detail Component', () => {
    let comp: EstadoPedidoRepuestoDetailComponent;
    let fixture: ComponentFixture<EstadoPedidoRepuestoDetailComponent>;
    const route = ({ data: of({ estadoPedidoRepuesto: new EstadoPedidoRepuesto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoPedidoRepuestoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EstadoPedidoRepuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoPedidoRepuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoPedidoRepuesto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
