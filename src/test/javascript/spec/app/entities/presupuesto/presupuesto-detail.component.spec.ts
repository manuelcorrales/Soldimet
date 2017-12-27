/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PresupuestoDetailComponent } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto-detail.component';
import { PresupuestoService } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto.service';
import { Presupuesto } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto.model';

describe('Component Tests', () => {

    describe('Presupuesto Management Detail Component', () => {
        let comp: PresupuestoDetailComponent;
        let fixture: ComponentFixture<PresupuestoDetailComponent>;
        let service: PresupuestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PresupuestoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PresupuestoService,
                    JhiEventManager
                ]
            }).overrideTemplate(PresupuestoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PresupuestoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresupuestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Presupuesto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.presupuesto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
