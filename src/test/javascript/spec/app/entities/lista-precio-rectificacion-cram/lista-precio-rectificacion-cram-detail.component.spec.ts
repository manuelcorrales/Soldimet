/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ListaPrecioRectificacionCRAMDetailComponent } from '../../../../../../main/webapp/app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram-detail.component';
import { ListaPrecioRectificacionCRAMService } from '../../../../../../main/webapp/app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.service';
import { ListaPrecioRectificacionCRAM } from '../../../../../../main/webapp/app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.model';

describe('Component Tests', () => {

    describe('ListaPrecioRectificacionCRAM Management Detail Component', () => {
        let comp: ListaPrecioRectificacionCRAMDetailComponent;
        let fixture: ComponentFixture<ListaPrecioRectificacionCRAMDetailComponent>;
        let service: ListaPrecioRectificacionCRAMService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [ListaPrecioRectificacionCRAMDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ListaPrecioRectificacionCRAMService,
                    JhiEventManager
                ]
            }).overrideTemplate(ListaPrecioRectificacionCRAMDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ListaPrecioRectificacionCRAMDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListaPrecioRectificacionCRAMService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ListaPrecioRectificacionCRAM(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.listaPrecioRectificacionCRAM).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
