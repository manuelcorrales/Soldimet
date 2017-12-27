/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CilindradaDetailComponent } from '../../../../../../main/webapp/app/entities/cilindrada/cilindrada-detail.component';
import { CilindradaService } from '../../../../../../main/webapp/app/entities/cilindrada/cilindrada.service';
import { Cilindrada } from '../../../../../../main/webapp/app/entities/cilindrada/cilindrada.model';

describe('Component Tests', () => {

    describe('Cilindrada Management Detail Component', () => {
        let comp: CilindradaDetailComponent;
        let fixture: ComponentFixture<CilindradaDetailComponent>;
        let service: CilindradaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CilindradaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CilindradaService,
                    JhiEventManager
                ]
            }).overrideTemplate(CilindradaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CilindradaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CilindradaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Cilindrada(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.cilindrada).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
