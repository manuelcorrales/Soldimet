/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EstadoCobranzaOperacionDetailComponent } from '../../../../../../main/webapp/app/entities/estado-cobranza-operacion/estado-cobranza-operacion-detail.component';
import { EstadoCobranzaOperacionService } from '../../../../../../main/webapp/app/entities/estado-cobranza-operacion/estado-cobranza-operacion.service';
import { EstadoCobranzaOperacion } from '../../../../../../main/webapp/app/entities/estado-cobranza-operacion/estado-cobranza-operacion.model';

describe('Component Tests', () => {

    describe('EstadoCobranzaOperacion Management Detail Component', () => {
        let comp: EstadoCobranzaOperacionDetailComponent;
        let fixture: ComponentFixture<EstadoCobranzaOperacionDetailComponent>;
        let service: EstadoCobranzaOperacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoCobranzaOperacionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EstadoCobranzaOperacionService,
                    JhiEventManager
                ]
            }).overrideTemplate(EstadoCobranzaOperacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstadoCobranzaOperacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoCobranzaOperacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EstadoCobranzaOperacion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.estadoCobranzaOperacion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
