/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EstadoArticuloDetailComponent } from '../../../../../../main/webapp/app/entities/estado-articulo/estado-articulo-detail.component';
import { EstadoArticuloService } from '../../../../../../main/webapp/app/entities/estado-articulo/estado-articulo.service';
import { EstadoArticulo } from '../../../../../../main/webapp/app/entities/estado-articulo/estado-articulo.model';

describe('Component Tests', () => {

    describe('EstadoArticulo Management Detail Component', () => {
        let comp: EstadoArticuloDetailComponent;
        let fixture: ComponentFixture<EstadoArticuloDetailComponent>;
        let service: EstadoArticuloService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoArticuloDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EstadoArticuloService,
                    JhiEventManager
                ]
            }).overrideTemplate(EstadoArticuloDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstadoArticuloDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoArticuloService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EstadoArticulo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.estadoArticulo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
