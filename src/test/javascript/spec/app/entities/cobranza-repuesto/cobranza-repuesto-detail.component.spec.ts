/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CobranzaRepuestoDetailComponent } from 'app/entities/cobranza-repuesto/cobranza-repuesto-detail.component';
import { CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';

describe('Component Tests', () => {
    describe('CobranzaRepuesto Management Detail Component', () => {
        let comp: CobranzaRepuestoDetailComponent;
        let fixture: ComponentFixture<CobranzaRepuestoDetailComponent>;
        const route = ({ data: of({ cobranzaRepuesto: new CobranzaRepuesto(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CobranzaRepuestoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CobranzaRepuestoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CobranzaRepuestoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cobranzaRepuesto).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
