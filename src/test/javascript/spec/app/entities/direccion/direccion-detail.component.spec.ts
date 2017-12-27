/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DireccionDetailComponent } from '../../../../../../main/webapp/app/entities/direccion/direccion-detail.component';
import { DireccionService } from '../../../../../../main/webapp/app/entities/direccion/direccion.service';
import { Direccion } from '../../../../../../main/webapp/app/entities/direccion/direccion.model';

describe('Component Tests', () => {

    describe('Direccion Management Detail Component', () => {
        let comp: DireccionDetailComponent;
        let fixture: ComponentFixture<DireccionDetailComponent>;
        let service: DireccionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [DireccionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DireccionService,
                    JhiEventManager
                ]
            }).overrideTemplate(DireccionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DireccionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DireccionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Direccion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.direccion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
