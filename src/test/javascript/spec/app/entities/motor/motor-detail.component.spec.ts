/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SoldimetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MotorDetailComponent } from '../../../../../../main/webapp/app/entities/motor/motor-detail.component';
import { MotorService } from '../../../../../../main/webapp/app/entities/motor/motor.service';
import { Motor } from '../../../../../../main/webapp/app/entities/motor/motor.model';

describe('Component Tests', () => {

    describe('Motor Management Detail Component', () => {
        let comp: MotorDetailComponent;
        let fixture: ComponentFixture<MotorDetailComponent>;
        let service: MotorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MotorDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MotorService,
                    JhiEventManager
                ]
            }).overrideTemplate(MotorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MotorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MotorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Motor(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.motor).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
