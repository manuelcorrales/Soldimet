/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LocalidadDetailComponent } from '../../../../../../main/webapp/app/entities/localidad/localidad-detail.component';
import { LocalidadService } from '../../../../../../main/webapp/app/entities/localidad/localidad.service';
import { Localidad } from '../../../../../../main/webapp/app/entities/localidad/localidad.model';

describe('Component Tests', () => {

    describe('Localidad Management Detail Component', () => {
        let comp: LocalidadDetailComponent;
        let fixture: ComponentFixture<LocalidadDetailComponent>;
        let service: LocalidadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [LocalidadDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LocalidadService,
                    JhiEventManager
                ]
            }).overrideTemplate(LocalidadDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LocalidadDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocalidadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Localidad(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.localidad).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
