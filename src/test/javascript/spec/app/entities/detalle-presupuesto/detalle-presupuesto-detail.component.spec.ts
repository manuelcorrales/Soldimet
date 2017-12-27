/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DetallePresupuestoDetailComponent } from '../../../../../../main/webapp/app/entities/detalle-presupuesto/detalle-presupuesto-detail.component';
import { DetallePresupuestoService } from '../../../../../../main/webapp/app/entities/detalle-presupuesto/detalle-presupuesto.service';
import { DetallePresupuesto } from '../../../../../../main/webapp/app/entities/detalle-presupuesto/detalle-presupuesto.model';

describe('Component Tests', () => {

    describe('DetallePresupuesto Management Detail Component', () => {
        let comp: DetallePresupuestoDetailComponent;
        let fixture: ComponentFixture<DetallePresupuestoDetailComponent>;
        let service: DetallePresupuestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [DetallePresupuestoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DetallePresupuestoService,
                    JhiEventManager
                ]
            }).overrideTemplate(DetallePresupuestoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DetallePresupuestoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetallePresupuestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DetallePresupuesto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.detallePresupuesto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
