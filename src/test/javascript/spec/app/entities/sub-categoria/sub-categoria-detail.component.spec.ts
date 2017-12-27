/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SubCategoriaDetailComponent } from '../../../../../../main/webapp/app/entities/sub-categoria/sub-categoria-detail.component';
import { SubCategoriaService } from '../../../../../../main/webapp/app/entities/sub-categoria/sub-categoria.service';
import { SubCategoria } from '../../../../../../main/webapp/app/entities/sub-categoria/sub-categoria.model';

describe('Component Tests', () => {

    describe('SubCategoria Management Detail Component', () => {
        let comp: SubCategoriaDetailComponent;
        let fixture: ComponentFixture<SubCategoriaDetailComponent>;
        let service: SubCategoriaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [SubCategoriaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SubCategoriaService,
                    JhiEventManager
                ]
            }).overrideTemplate(SubCategoriaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubCategoriaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubCategoriaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SubCategoria(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.subCategoria).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
