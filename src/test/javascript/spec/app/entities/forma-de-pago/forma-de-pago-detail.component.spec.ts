/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FormaDePagoDetailComponent } from '../../../../../../main/webapp/app/entities/forma-de-pago/forma-de-pago-detail.component';
import { FormaDePagoService } from '../../../../../../main/webapp/app/entities/forma-de-pago/forma-de-pago.service';
import { FormaDePago } from '../../../../../../main/webapp/app/entities/forma-de-pago/forma-de-pago.model';

describe('Component Tests', () => {

    describe('FormaDePago Management Detail Component', () => {
        let comp: FormaDePagoDetailComponent;
        let fixture: ComponentFixture<FormaDePagoDetailComponent>;
        let service: FormaDePagoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [FormaDePagoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FormaDePagoService,
                    JhiEventManager
                ]
            }).overrideTemplate(FormaDePagoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormaDePagoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormaDePagoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FormaDePago(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.formaDePago).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
