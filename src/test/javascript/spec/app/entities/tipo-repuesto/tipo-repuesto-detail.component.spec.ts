/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipoRepuestoDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-repuesto/tipo-repuesto-detail.component';
import { TipoRepuestoService } from '../../../../../../main/webapp/app/entities/tipo-repuesto/tipo-repuesto.service';
import { TipoRepuesto } from '../../../../../../main/webapp/app/entities/tipo-repuesto/tipo-repuesto.model';

describe('Component Tests', () => {

    describe('TipoRepuesto Management Detail Component', () => {
        let comp: TipoRepuestoDetailComponent;
        let fixture: ComponentFixture<TipoRepuestoDetailComponent>;
        let service: TipoRepuestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoRepuestoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipoRepuestoService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipoRepuestoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoRepuestoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoRepuestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TipoRepuesto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipoRepuesto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
