/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EstadoPedidoRepuestoDetailComponent } from '../../../../../../main/webapp/app/entities/estado-pedido-repuesto/estado-pedido-repuesto-detail.component';
import { EstadoPedidoRepuestoService } from '../../../../../../main/webapp/app/entities/estado-pedido-repuesto/estado-pedido-repuesto.service';
import { EstadoPedidoRepuesto } from '../../../../../../main/webapp/app/entities/estado-pedido-repuesto/estado-pedido-repuesto.model';

describe('Component Tests', () => {

    describe('EstadoPedidoRepuesto Management Detail Component', () => {
        let comp: EstadoPedidoRepuestoDetailComponent;
        let fixture: ComponentFixture<EstadoPedidoRepuestoDetailComponent>;
        let service: EstadoPedidoRepuestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoPedidoRepuestoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EstadoPedidoRepuestoService,
                    JhiEventManager
                ]
            }).overrideTemplate(EstadoPedidoRepuestoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstadoPedidoRepuestoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoPedidoRepuestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EstadoPedidoRepuesto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.estadoPedidoRepuesto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
