/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { TipoParteMotorDetailComponent } from 'app/entities/tipo-parte-motor/tipo-parte-motor-detail.component';
import { TipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';

describe('Component Tests', () => {
    describe('TipoParteMotor Management Detail Component', () => {
        let comp: TipoParteMotorDetailComponent;
        let fixture: ComponentFixture<TipoParteMotorDetailComponent>;
        const route = ({ data: of({ tipoParteMotor: new TipoParteMotor(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoParteMotorDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TipoParteMotorDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoParteMotorDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tipoParteMotor).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
