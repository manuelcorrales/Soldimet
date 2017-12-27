/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DetallePedidoDetailComponent } from '../../../../../../main/webapp/app/entities/detalle-pedido/detalle-pedido-detail.component';
import { DetallePedidoService } from '../../../../../../main/webapp/app/entities/detalle-pedido/detalle-pedido.service';
import { DetallePedido } from '../../../../../../main/webapp/app/entities/detalle-pedido/detalle-pedido.model';

describe('Component Tests', () => {

    describe('DetallePedido Management Detail Component', () => {
        let comp: DetallePedidoDetailComponent;
        let fixture: ComponentFixture<DetallePedidoDetailComponent>;
        let service: DetallePedidoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [DetallePedidoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DetallePedidoService,
                    JhiEventManager
                ]
            }).overrideTemplate(DetallePedidoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DetallePedidoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetallePedidoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DetallePedido(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.detallePedido).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
