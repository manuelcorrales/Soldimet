/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EmpleadoDetailComponent } from '../../../../../../main/webapp/app/entities/empleado/empleado-detail.component';
import { EmpleadoService } from '../../../../../../main/webapp/app/entities/empleado/empleado.service';
import { Empleado } from '../../../../../../main/webapp/app/entities/empleado/empleado.model';

describe('Component Tests', () => {

    describe('Empleado Management Detail Component', () => {
        let comp: EmpleadoDetailComponent;
        let fixture: ComponentFixture<EmpleadoDetailComponent>;
        let service: EmpleadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EmpleadoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EmpleadoService,
                    JhiEventManager
                ]
            }).overrideTemplate(EmpleadoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmpleadoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpleadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Empleado(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.empleado).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
