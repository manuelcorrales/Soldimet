/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PagoTarjetaDetailComponent } from '../../../../../../main/webapp/app/entities/pago-tarjeta/pago-tarjeta-detail.component';
import { PagoTarjetaService } from '../../../../../../main/webapp/app/entities/pago-tarjeta/pago-tarjeta.service';
import { PagoTarjeta } from '../../../../../../main/webapp/app/entities/pago-tarjeta/pago-tarjeta.model';

describe('Component Tests', () => {

    describe('PagoTarjeta Management Detail Component', () => {
        let comp: PagoTarjetaDetailComponent;
        let fixture: ComponentFixture<PagoTarjetaDetailComponent>;
        let service: PagoTarjetaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PagoTarjetaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PagoTarjetaService,
                    JhiEventManager
                ]
            }).overrideTemplate(PagoTarjetaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PagoTarjetaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagoTarjetaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PagoTarjeta(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pagoTarjeta).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
