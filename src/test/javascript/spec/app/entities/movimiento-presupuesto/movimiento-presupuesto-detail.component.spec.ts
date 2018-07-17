/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MovimientoPresupuestoDetailComponent } from '../../../../../../main/webapp/app/entities/movimiento-presupuesto/movimiento-presupuesto-detail.component';
import { MovimientoPresupuestoService } from '../../../../../../main/webapp/app/entities/movimiento-presupuesto/movimiento-presupuesto.service';
import { MovimientoPresupuesto } from '../../../../../../main/webapp/app/entities/movimiento-presupuesto/movimiento-presupuesto.model';

describe('Component Tests', () => {

    describe('MovimientoPresupuesto Management Detail Component', () => {
        let comp: MovimientoPresupuestoDetailComponent;
        let fixture: ComponentFixture<MovimientoPresupuestoDetailComponent>;
        let service: MovimientoPresupuestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MovimientoPresupuestoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MovimientoPresupuestoService,
                    JhiEventManager
                ]
            }).overrideTemplate(MovimientoPresupuestoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MovimientoPresupuestoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovimientoPresupuestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MovimientoPresupuesto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.movimientoPresupuesto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
