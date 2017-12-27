/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EstadoPresupuestoDetailComponent } from '../../../../../../main/webapp/app/entities/estado-presupuesto/estado-presupuesto-detail.component';
import { EstadoPresupuestoService } from '../../../../../../main/webapp/app/entities/estado-presupuesto/estado-presupuesto.service';
import { EstadoPresupuesto } from '../../../../../../main/webapp/app/entities/estado-presupuesto/estado-presupuesto.model';

describe('Component Tests', () => {

    describe('EstadoPresupuesto Management Detail Component', () => {
        let comp: EstadoPresupuestoDetailComponent;
        let fixture: ComponentFixture<EstadoPresupuestoDetailComponent>;
        let service: EstadoPresupuestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoPresupuestoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EstadoPresupuestoService,
                    JhiEventManager
                ]
            }).overrideTemplate(EstadoPresupuestoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstadoPresupuestoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoPresupuestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EstadoPresupuesto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.estadoPresupuesto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
