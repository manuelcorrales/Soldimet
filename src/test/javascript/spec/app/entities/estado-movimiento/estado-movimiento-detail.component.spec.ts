/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EstadoMovimientoDetailComponent } from '../../../../../../main/webapp/app/entities/estado-movimiento/estado-movimiento-detail.component';
import { EstadoMovimientoService } from '../../../../../../main/webapp/app/entities/estado-movimiento/estado-movimiento.service';
import { EstadoMovimiento } from '../../../../../../main/webapp/app/entities/estado-movimiento/estado-movimiento.model';

describe('Component Tests', () => {

    describe('EstadoMovimiento Management Detail Component', () => {
        let comp: EstadoMovimientoDetailComponent;
        let fixture: ComponentFixture<EstadoMovimientoDetailComponent>;
        let service: EstadoMovimientoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoMovimientoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EstadoMovimientoService,
                    JhiEventManager
                ]
            }).overrideTemplate(EstadoMovimientoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstadoMovimientoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoMovimientoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EstadoMovimiento(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.estadoMovimiento).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
