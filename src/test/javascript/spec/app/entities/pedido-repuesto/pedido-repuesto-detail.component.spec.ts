/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PedidoRepuestoDetailComponent } from '../../../../../../main/webapp/app/entities/pedido-repuesto/pedido-repuesto-detail.component';
import { PedidoRepuestoService } from '../../../../../../main/webapp/app/entities/pedido-repuesto/pedido-repuesto.service';
import { PedidoRepuesto } from '../../../../../../main/webapp/app/entities/pedido-repuesto/pedido-repuesto.model';

describe('Component Tests', () => {

    describe('PedidoRepuesto Management Detail Component', () => {
        let comp: PedidoRepuestoDetailComponent;
        let fixture: ComponentFixture<PedidoRepuestoDetailComponent>;
        let service: PedidoRepuestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PedidoRepuestoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PedidoRepuestoService,
                    JhiEventManager
                ]
            }).overrideTemplate(PedidoRepuestoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PedidoRepuestoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PedidoRepuestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PedidoRepuesto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pedidoRepuesto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
