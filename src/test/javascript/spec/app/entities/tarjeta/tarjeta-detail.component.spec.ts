/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TarjetaDetailComponent } from '../../../../../../main/webapp/app/entities/tarjeta/tarjeta-detail.component';
import { TarjetaService } from '../../../../../../main/webapp/app/entities/tarjeta/tarjeta.service';
import { Tarjeta } from '../../../../../../main/webapp/app/entities/tarjeta/tarjeta.model';

describe('Component Tests', () => {

    describe('Tarjeta Management Detail Component', () => {
        let comp: TarjetaDetailComponent;
        let fixture: ComponentFixture<TarjetaDetailComponent>;
        let service: TarjetaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TarjetaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TarjetaService,
                    JhiEventManager
                ]
            }).overrideTemplate(TarjetaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TarjetaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TarjetaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tarjeta(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tarjeta).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
