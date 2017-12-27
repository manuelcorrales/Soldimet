/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipoParteMotorDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-parte-motor/tipo-parte-motor-detail.component';
import { TipoParteMotorService } from '../../../../../../main/webapp/app/entities/tipo-parte-motor/tipo-parte-motor.service';
import { TipoParteMotor } from '../../../../../../main/webapp/app/entities/tipo-parte-motor/tipo-parte-motor.model';

describe('Component Tests', () => {

    describe('TipoParteMotor Management Detail Component', () => {
        let comp: TipoParteMotorDetailComponent;
        let fixture: ComponentFixture<TipoParteMotorDetailComponent>;
        let service: TipoParteMotorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoParteMotorDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipoParteMotorService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipoParteMotorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoParteMotorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoParteMotorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TipoParteMotor(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipoParteMotor).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
