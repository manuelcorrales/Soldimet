/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CajaDetailComponent } from '../../../../../../main/webapp/app/entities/caja/caja-detail.component';
import { CajaService } from '../../../../../../main/webapp/app/entities/caja/caja.service';
import { Caja } from '../../../../../../main/webapp/app/entities/caja/caja.model';

describe('Component Tests', () => {

    describe('Caja Management Detail Component', () => {
        let comp: CajaDetailComponent;
        let fixture: ComponentFixture<CajaDetailComponent>;
        let service: CajaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CajaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CajaService,
                    JhiEventManager
                ]
            }).overrideTemplate(CajaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CajaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CajaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Caja(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.caja).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
