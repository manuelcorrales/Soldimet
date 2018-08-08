/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MovimientoPedidoDetailComponent } from 'app/entities/movimiento-pedido/movimiento-pedido-detail.component';
import { MovimientoPedido } from 'app/shared/model/movimiento-pedido.model';

describe('Component Tests', () => {
    describe('MovimientoPedido Management Detail Component', () => {
        let comp: MovimientoPedidoDetailComponent;
        let fixture: ComponentFixture<MovimientoPedidoDetailComponent>;
        const route = ({ data: of({ movimientoPedido: new MovimientoPedido(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MovimientoPedidoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MovimientoPedidoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MovimientoPedidoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.movimientoPedido).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
