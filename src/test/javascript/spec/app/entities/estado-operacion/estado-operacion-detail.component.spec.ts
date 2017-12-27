/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EstadoOperacionDetailComponent } from '../../../../../../main/webapp/app/entities/estado-operacion/estado-operacion-detail.component';
import { EstadoOperacionService } from '../../../../../../main/webapp/app/entities/estado-operacion/estado-operacion.service';
import { EstadoOperacion } from '../../../../../../main/webapp/app/entities/estado-operacion/estado-operacion.model';

describe('Component Tests', () => {

    describe('EstadoOperacion Management Detail Component', () => {
        let comp: EstadoOperacionDetailComponent;
        let fixture: ComponentFixture<EstadoOperacionDetailComponent>;
        let service: EstadoOperacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoOperacionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EstadoOperacionService,
                    JhiEventManager
                ]
            }).overrideTemplate(EstadoOperacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstadoOperacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoOperacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EstadoOperacion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.estadoOperacion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
