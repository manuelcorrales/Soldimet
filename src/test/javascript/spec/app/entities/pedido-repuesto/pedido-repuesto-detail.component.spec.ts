import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { PedidoRepuestoDetailComponent } from 'app/entities/pedido-repuesto/pedido-repuesto-detail.component';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';

describe('Component Tests', () => {
  describe('PedidoRepuesto Management Detail Component', () => {
    let comp: PedidoRepuestoDetailComponent;
    let fixture: ComponentFixture<PedidoRepuestoDetailComponent>;
    const route = ({ data: of({ pedidoRepuesto: new PedidoRepuesto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [PedidoRepuestoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PedidoRepuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PedidoRepuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pedidoRepuesto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
