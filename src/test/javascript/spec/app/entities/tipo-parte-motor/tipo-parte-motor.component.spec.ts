/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { TipoParteMotorComponent } from 'app/entities/tipo-parte-motor/tipo-parte-motor.component';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/tipo-parte-motor.service';
import { TipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';

describe('Component Tests', () => {
    describe('TipoParteMotor Management Component', () => {
        let comp: TipoParteMotorComponent;
        let fixture: ComponentFixture<TipoParteMotorComponent>;
        let service: TipoParteMotorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoParteMotorComponent],
                providers: []
            })
                .overrideTemplate(TipoParteMotorComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoParteMotorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoParteMotorService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TipoParteMotor(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tipoParteMotors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
