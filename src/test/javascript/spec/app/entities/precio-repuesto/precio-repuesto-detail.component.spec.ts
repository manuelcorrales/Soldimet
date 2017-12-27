/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PrecioRepuestoDetailComponent } from '../../../../../../main/webapp/app/entities/precio-repuesto/precio-repuesto-detail.component';
import { PrecioRepuestoService } from '../../../../../../main/webapp/app/entities/precio-repuesto/precio-repuesto.service';
import { PrecioRepuesto } from '../../../../../../main/webapp/app/entities/precio-repuesto/precio-repuesto.model';

describe('Component Tests', () => {

    describe('PrecioRepuesto Management Detail Component', () => {
        let comp: PrecioRepuestoDetailComponent;
        let fixture: ComponentFixture<PrecioRepuestoDetailComponent>;
        let service: PrecioRepuestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PrecioRepuestoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PrecioRepuestoService,
                    JhiEventManager
                ]
            }).overrideTemplate(PrecioRepuestoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrecioRepuestoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecioRepuestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PrecioRepuesto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.precioRepuesto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
