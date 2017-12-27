/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CostoOperacionDetailComponent } from '../../../../../../main/webapp/app/entities/costo-operacion/costo-operacion-detail.component';
import { CostoOperacionService } from '../../../../../../main/webapp/app/entities/costo-operacion/costo-operacion.service';
import { CostoOperacion } from '../../../../../../main/webapp/app/entities/costo-operacion/costo-operacion.model';

describe('Component Tests', () => {

    describe('CostoOperacion Management Detail Component', () => {
        let comp: CostoOperacionDetailComponent;
        let fixture: ComponentFixture<CostoOperacionDetailComponent>;
        let service: CostoOperacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CostoOperacionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CostoOperacionService,
                    JhiEventManager
                ]
            }).overrideTemplate(CostoOperacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoOperacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoOperacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CostoOperacion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.costoOperacion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
