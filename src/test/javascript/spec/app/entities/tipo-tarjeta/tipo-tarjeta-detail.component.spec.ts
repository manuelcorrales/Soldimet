/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipoTarjetaDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-tarjeta/tipo-tarjeta-detail.component';
import { TipoTarjetaService } from '../../../../../../main/webapp/app/entities/tipo-tarjeta/tipo-tarjeta.service';
import { TipoTarjeta } from '../../../../../../main/webapp/app/entities/tipo-tarjeta/tipo-tarjeta.model';

describe('Component Tests', () => {

    describe('TipoTarjeta Management Detail Component', () => {
        let comp: TipoTarjetaDetailComponent;
        let fixture: ComponentFixture<TipoTarjetaDetailComponent>;
        let service: TipoTarjetaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoTarjetaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipoTarjetaService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipoTarjetaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoTarjetaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoTarjetaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TipoTarjeta(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipoTarjeta).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
