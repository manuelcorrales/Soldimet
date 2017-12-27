/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CobranzaOperacionDetailComponent } from '../../../../../../main/webapp/app/entities/cobranza-operacion/cobranza-operacion-detail.component';
import { CobranzaOperacionService } from '../../../../../../main/webapp/app/entities/cobranza-operacion/cobranza-operacion.service';
import { CobranzaOperacion } from '../../../../../../main/webapp/app/entities/cobranza-operacion/cobranza-operacion.model';

describe('Component Tests', () => {

    describe('CobranzaOperacion Management Detail Component', () => {
        let comp: CobranzaOperacionDetailComponent;
        let fixture: ComponentFixture<CobranzaOperacionDetailComponent>;
        let service: CobranzaOperacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CobranzaOperacionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CobranzaOperacionService,
                    JhiEventManager
                ]
            }).overrideTemplate(CobranzaOperacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CobranzaOperacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CobranzaOperacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CobranzaOperacion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.cobranzaOperacion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
