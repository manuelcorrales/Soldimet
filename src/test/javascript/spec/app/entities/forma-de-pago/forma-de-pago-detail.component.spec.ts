/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { FormaDePagoDetailComponent } from 'app/entities/forma-de-pago/forma-de-pago-detail.component';
import { FormaDePago } from 'app/shared/model/forma-de-pago.model';

describe('Component Tests', () => {
    describe('FormaDePago Management Detail Component', () => {
        let comp: FormaDePagoDetailComponent;
        let fixture: ComponentFixture<FormaDePagoDetailComponent>;
        const route = ({ data: of({ formaDePago: new FormaDePago(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [FormaDePagoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FormaDePagoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FormaDePagoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.formaDePago).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
