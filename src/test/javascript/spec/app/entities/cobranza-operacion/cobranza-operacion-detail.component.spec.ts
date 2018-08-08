/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CobranzaOperacionDetailComponent } from 'app/entities/cobranza-operacion/cobranza-operacion-detail.component';
import { CobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';

describe('Component Tests', () => {
    describe('CobranzaOperacion Management Detail Component', () => {
        let comp: CobranzaOperacionDetailComponent;
        let fixture: ComponentFixture<CobranzaOperacionDetailComponent>;
        const route = ({ data: of({ cobranzaOperacion: new CobranzaOperacion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CobranzaOperacionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CobranzaOperacionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CobranzaOperacionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cobranzaOperacion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
