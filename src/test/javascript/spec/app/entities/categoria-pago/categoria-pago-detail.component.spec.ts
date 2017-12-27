/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CategoriaPagoDetailComponent } from '../../../../../../main/webapp/app/entities/categoria-pago/categoria-pago-detail.component';
import { CategoriaPagoService } from '../../../../../../main/webapp/app/entities/categoria-pago/categoria-pago.service';
import { CategoriaPago } from '../../../../../../main/webapp/app/entities/categoria-pago/categoria-pago.model';

describe('Component Tests', () => {

    describe('CategoriaPago Management Detail Component', () => {
        let comp: CategoriaPagoDetailComponent;
        let fixture: ComponentFixture<CategoriaPagoDetailComponent>;
        let service: CategoriaPagoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CategoriaPagoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CategoriaPagoService,
                    JhiEventManager
                ]
            }).overrideTemplate(CategoriaPagoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoriaPagoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriaPagoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CategoriaPago(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.categoriaPago).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
