/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ArticuloDetailComponent } from '../../../../../../main/webapp/app/entities/articulo/articulo-detail.component';
import { ArticuloService } from '../../../../../../main/webapp/app/entities/articulo/articulo.service';
import { Articulo } from '../../../../../../main/webapp/app/entities/articulo/articulo.model';

describe('Component Tests', () => {

    describe('Articulo Management Detail Component', () => {
        let comp: ArticuloDetailComponent;
        let fixture: ComponentFixture<ArticuloDetailComponent>;
        let service: ArticuloService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [ArticuloDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ArticuloService,
                    JhiEventManager
                ]
            }).overrideTemplate(ArticuloDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArticuloDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticuloService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Articulo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.articulo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
