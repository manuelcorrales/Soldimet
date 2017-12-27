/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipoDetalleMovimientoDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento-detail.component';
import { TipoDetalleMovimientoService } from '../../../../../../main/webapp/app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.service';
import { TipoDetalleMovimiento } from '../../../../../../main/webapp/app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.model';

describe('Component Tests', () => {

    describe('TipoDetalleMovimiento Management Detail Component', () => {
        let comp: TipoDetalleMovimientoDetailComponent;
        let fixture: ComponentFixture<TipoDetalleMovimientoDetailComponent>;
        let service: TipoDetalleMovimientoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoDetalleMovimientoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipoDetalleMovimientoService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipoDetalleMovimientoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoDetalleMovimientoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoDetalleMovimientoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TipoDetalleMovimiento(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipoDetalleMovimiento).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
