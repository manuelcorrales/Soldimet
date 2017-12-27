/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DetalleMovimientoDetailComponent } from '../../../../../../main/webapp/app/entities/detalle-movimiento/detalle-movimiento-detail.component';
import { DetalleMovimientoService } from '../../../../../../main/webapp/app/entities/detalle-movimiento/detalle-movimiento.service';
import { DetalleMovimiento } from '../../../../../../main/webapp/app/entities/detalle-movimiento/detalle-movimiento.model';

describe('Component Tests', () => {

    describe('DetalleMovimiento Management Detail Component', () => {
        let comp: DetalleMovimientoDetailComponent;
        let fixture: ComponentFixture<DetalleMovimientoDetailComponent>;
        let service: DetalleMovimientoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [DetalleMovimientoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DetalleMovimientoService,
                    JhiEventManager
                ]
            }).overrideTemplate(DetalleMovimientoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DetalleMovimientoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetalleMovimientoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DetalleMovimiento(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.detalleMovimiento).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
