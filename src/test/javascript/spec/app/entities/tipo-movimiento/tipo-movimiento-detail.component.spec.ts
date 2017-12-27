/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipoMovimientoDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-movimiento/tipo-movimiento-detail.component';
import { TipoMovimientoService } from '../../../../../../main/webapp/app/entities/tipo-movimiento/tipo-movimiento.service';
import { TipoMovimiento } from '../../../../../../main/webapp/app/entities/tipo-movimiento/tipo-movimiento.model';

describe('Component Tests', () => {

    describe('TipoMovimiento Management Detail Component', () => {
        let comp: TipoMovimientoDetailComponent;
        let fixture: ComponentFixture<TipoMovimientoDetailComponent>;
        let service: TipoMovimientoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoMovimientoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipoMovimientoService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipoMovimientoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoMovimientoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoMovimientoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TipoMovimiento(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipoMovimiento).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
