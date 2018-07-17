/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CostoRepuestoDetailComponent } from '../../../../../../main/webapp/app/entities/costo-repuesto/costo-repuesto-detail.component';
import { CostoRepuestoService } from '../../../../../../main/webapp/app/entities/costo-repuesto/costo-repuesto.service';
import { CostoRepuesto } from '../../../../../../main/webapp/app/entities/costo-repuesto/costo-repuesto.model';

describe('Component Tests', () => {

    describe('CostoRepuesto Management Detail Component', () => {
        let comp: CostoRepuestoDetailComponent;
        let fixture: ComponentFixture<CostoRepuestoDetailComponent>;
        let service: CostoRepuestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CostoRepuestoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CostoRepuestoService,
                    JhiEventManager
                ]
            }).overrideTemplate(CostoRepuestoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoRepuestoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoRepuestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CostoRepuesto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.costoRepuesto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
