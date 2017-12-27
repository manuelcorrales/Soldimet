/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PagoEfectivoDetailComponent } from '../../../../../../main/webapp/app/entities/pago-efectivo/pago-efectivo-detail.component';
import { PagoEfectivoService } from '../../../../../../main/webapp/app/entities/pago-efectivo/pago-efectivo.service';
import { PagoEfectivo } from '../../../../../../main/webapp/app/entities/pago-efectivo/pago-efectivo.model';

describe('Component Tests', () => {

    describe('PagoEfectivo Management Detail Component', () => {
        let comp: PagoEfectivoDetailComponent;
        let fixture: ComponentFixture<PagoEfectivoDetailComponent>;
        let service: PagoEfectivoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PagoEfectivoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PagoEfectivoService,
                    JhiEventManager
                ]
            }).overrideTemplate(PagoEfectivoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PagoEfectivoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagoEfectivoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PagoEfectivo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pagoEfectivo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
