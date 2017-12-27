/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ListaPrecioDesdeHastaDetailComponent } from '../../../../../../main/webapp/app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta-detail.component';
import { ListaPrecioDesdeHastaService } from '../../../../../../main/webapp/app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.service';
import { ListaPrecioDesdeHasta } from '../../../../../../main/webapp/app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.model';

describe('Component Tests', () => {

    describe('ListaPrecioDesdeHasta Management Detail Component', () => {
        let comp: ListaPrecioDesdeHastaDetailComponent;
        let fixture: ComponentFixture<ListaPrecioDesdeHastaDetailComponent>;
        let service: ListaPrecioDesdeHastaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [ListaPrecioDesdeHastaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ListaPrecioDesdeHastaService,
                    JhiEventManager
                ]
            }).overrideTemplate(ListaPrecioDesdeHastaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ListaPrecioDesdeHastaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListaPrecioDesdeHastaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ListaPrecioDesdeHasta(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.listaPrecioDesdeHasta).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
