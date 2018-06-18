/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CobranzaRepuestoDetailComponent } from '../../../../../../main/webapp/app/entities/cobranza-repuesto/cobranza-repuesto-detail.component';
import { CobranzaRepuestoService } from '../../../../../../main/webapp/app/entities/cobranza-repuesto/cobranza-repuesto.service';
import { CobranzaRepuesto } from '../../../../../../main/webapp/app/entities/cobranza-repuesto/cobranza-repuesto.model';

describe('Component Tests', () => {

    describe('CobranzaRepuesto Management Detail Component', () => {
        let comp: CobranzaRepuestoDetailComponent;
        let fixture: ComponentFixture<CobranzaRepuestoDetailComponent>;
        let service: CobranzaRepuestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CobranzaRepuestoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CobranzaRepuestoService,
                    JhiEventManager
                ]
            }).overrideTemplate(CobranzaRepuestoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CobranzaRepuestoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CobranzaRepuestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CobranzaRepuesto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.cobranzaRepuesto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
