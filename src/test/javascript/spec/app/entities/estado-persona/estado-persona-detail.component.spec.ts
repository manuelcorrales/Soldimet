/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EstadoPersonaDetailComponent } from '../../../../../../main/webapp/app/entities/estado-persona/estado-persona-detail.component';
import { EstadoPersonaService } from '../../../../../../main/webapp/app/entities/estado-persona/estado-persona.service';
import { EstadoPersona } from '../../../../../../main/webapp/app/entities/estado-persona/estado-persona.model';

describe('Component Tests', () => {

    describe('EstadoPersona Management Detail Component', () => {
        let comp: EstadoPersonaDetailComponent;
        let fixture: ComponentFixture<EstadoPersonaDetailComponent>;
        let service: EstadoPersonaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoPersonaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EstadoPersonaService,
                    JhiEventManager
                ]
            }).overrideTemplate(EstadoPersonaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstadoPersonaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoPersonaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EstadoPersona(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.estadoPersona).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
