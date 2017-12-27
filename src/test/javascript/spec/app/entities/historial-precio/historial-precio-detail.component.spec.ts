/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { HistorialPrecioDetailComponent } from '../../../../../../main/webapp/app/entities/historial-precio/historial-precio-detail.component';
import { HistorialPrecioService } from '../../../../../../main/webapp/app/entities/historial-precio/historial-precio.service';
import { HistorialPrecio } from '../../../../../../main/webapp/app/entities/historial-precio/historial-precio.model';

describe('Component Tests', () => {

    describe('HistorialPrecio Management Detail Component', () => {
        let comp: HistorialPrecioDetailComponent;
        let fixture: ComponentFixture<HistorialPrecioDetailComponent>;
        let service: HistorialPrecioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [HistorialPrecioDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    HistorialPrecioService,
                    JhiEventManager
                ]
            }).overrideTemplate(HistorialPrecioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HistorialPrecioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistorialPrecioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new HistorialPrecio(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.historialPrecio).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
