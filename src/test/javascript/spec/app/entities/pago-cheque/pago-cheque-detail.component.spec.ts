/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PagoChequeDetailComponent } from '../../../../../../main/webapp/app/entities/pago-cheque/pago-cheque-detail.component';
import { PagoChequeService } from '../../../../../../main/webapp/app/entities/pago-cheque/pago-cheque.service';
import { PagoCheque } from '../../../../../../main/webapp/app/entities/pago-cheque/pago-cheque.model';

describe('Component Tests', () => {

    describe('PagoCheque Management Detail Component', () => {
        let comp: PagoChequeDetailComponent;
        let fixture: ComponentFixture<PagoChequeDetailComponent>;
        let service: PagoChequeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PagoChequeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PagoChequeService,
                    JhiEventManager
                ]
            }).overrideTemplate(PagoChequeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PagoChequeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagoChequeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PagoCheque(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pagoCheque).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
