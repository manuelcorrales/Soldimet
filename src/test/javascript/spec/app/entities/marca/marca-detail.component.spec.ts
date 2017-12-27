/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MarcaDetailComponent } from '../../../../../../main/webapp/app/entities/marca/marca-detail.component';
import { MarcaService } from '../../../../../../main/webapp/app/entities/marca/marca.service';
import { Marca } from '../../../../../../main/webapp/app/entities/marca/marca.model';

describe('Component Tests', () => {

    describe('Marca Management Detail Component', () => {
        let comp: MarcaDetailComponent;
        let fixture: ComponentFixture<MarcaDetailComponent>;
        let service: MarcaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MarcaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MarcaService,
                    JhiEventManager
                ]
            }).overrideTemplate(MarcaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MarcaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarcaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Marca(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.marca).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
