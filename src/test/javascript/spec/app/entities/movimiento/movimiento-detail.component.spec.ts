/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MovimientoDetailComponent } from '../../../../../../main/webapp/app/entities/movimiento/movimiento-detail.component';
import { MovimientoService } from '../../../../../../main/webapp/app/entities/movimiento/movimiento.service';
import { Movimiento } from '../../../../../../main/webapp/app/entities/movimiento/movimiento.model';

describe('Component Tests', () => {

    describe('Movimiento Management Detail Component', () => {
        let comp: MovimientoDetailComponent;
        let fixture: ComponentFixture<MovimientoDetailComponent>;
        let service: MovimientoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MovimientoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MovimientoService,
                    JhiEventManager
                ]
            }).overrideTemplate(MovimientoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MovimientoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovimientoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Movimiento(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.movimiento).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
