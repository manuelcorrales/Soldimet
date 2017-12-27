/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AplicacionDetailComponent } from '../../../../../../main/webapp/app/entities/aplicacion/aplicacion-detail.component';
import { AplicacionService } from '../../../../../../main/webapp/app/entities/aplicacion/aplicacion.service';
import { Aplicacion } from '../../../../../../main/webapp/app/entities/aplicacion/aplicacion.model';

describe('Component Tests', () => {

    describe('Aplicacion Management Detail Component', () => {
        let comp: AplicacionDetailComponent;
        let fixture: ComponentFixture<AplicacionDetailComponent>;
        let service: AplicacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [AplicacionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AplicacionService,
                    JhiEventManager
                ]
            }).overrideTemplate(AplicacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AplicacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AplicacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Aplicacion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.aplicacion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
