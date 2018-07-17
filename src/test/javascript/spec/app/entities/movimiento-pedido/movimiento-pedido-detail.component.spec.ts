/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MovimientoPedidoDetailComponent } from '../../../../../../main/webapp/app/entities/movimiento-pedido/movimiento-pedido-detail.component';
import { MovimientoPedidoService } from '../../../../../../main/webapp/app/entities/movimiento-pedido/movimiento-pedido.service';
import { MovimientoPedido } from '../../../../../../main/webapp/app/entities/movimiento-pedido/movimiento-pedido.model';

describe('Component Tests', () => {

    describe('MovimientoPedido Management Detail Component', () => {
        let comp: MovimientoPedidoDetailComponent;
        let fixture: ComponentFixture<MovimientoPedidoDetailComponent>;
        let service: MovimientoPedidoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MovimientoPedidoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MovimientoPedidoService,
                    JhiEventManager
                ]
            }).overrideTemplate(MovimientoPedidoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MovimientoPedidoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovimientoPedidoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MovimientoPedido(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.movimientoPedido).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
