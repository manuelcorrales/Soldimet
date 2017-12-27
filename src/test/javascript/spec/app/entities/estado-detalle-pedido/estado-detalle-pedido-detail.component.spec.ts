/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EstadoDetallePedidoDetailComponent } from '../../../../../../main/webapp/app/entities/estado-detalle-pedido/estado-detalle-pedido-detail.component';
import { EstadoDetallePedidoService } from '../../../../../../main/webapp/app/entities/estado-detalle-pedido/estado-detalle-pedido.service';
import { EstadoDetallePedido } from '../../../../../../main/webapp/app/entities/estado-detalle-pedido/estado-detalle-pedido.model';

describe('Component Tests', () => {

    describe('EstadoDetallePedido Management Detail Component', () => {
        let comp: EstadoDetallePedidoDetailComponent;
        let fixture: ComponentFixture<EstadoDetallePedidoDetailComponent>;
        let service: EstadoDetallePedidoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoDetallePedidoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EstadoDetallePedidoService,
                    JhiEventManager
                ]
            }).overrideTemplate(EstadoDetallePedidoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstadoDetallePedidoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoDetallePedidoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EstadoDetallePedido(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.estadoDetallePedido).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
