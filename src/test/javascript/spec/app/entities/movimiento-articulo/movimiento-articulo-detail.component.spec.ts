/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MovimientoArticuloDetailComponent } from '../../../../../../main/webapp/app/entities/movimiento-articulo/movimiento-articulo-detail.component';
import { MovimientoArticuloService } from '../../../../../../main/webapp/app/entities/movimiento-articulo/movimiento-articulo.service';
import { MovimientoArticulo } from '../../../../../../main/webapp/app/entities/movimiento-articulo/movimiento-articulo.model';

describe('Component Tests', () => {

    describe('MovimientoArticulo Management Detail Component', () => {
        let comp: MovimientoArticuloDetailComponent;
        let fixture: ComponentFixture<MovimientoArticuloDetailComponent>;
        let service: MovimientoArticuloService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MovimientoArticuloDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MovimientoArticuloService,
                    JhiEventManager
                ]
            }).overrideTemplate(MovimientoArticuloDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MovimientoArticuloDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovimientoArticuloService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MovimientoArticulo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.movimientoArticulo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
