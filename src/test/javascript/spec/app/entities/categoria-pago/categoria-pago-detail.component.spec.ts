/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CategoriaPagoDetailComponent } from 'app/entities/categoria-pago/categoria-pago-detail.component';
import { CategoriaPago } from 'app/shared/model/categoria-pago.model';

describe('Component Tests', () => {
    describe('CategoriaPago Management Detail Component', () => {
        let comp: CategoriaPagoDetailComponent;
        let fixture: ComponentFixture<CategoriaPagoDetailComponent>;
        const route = ({ data: of({ categoriaPago: new CategoriaPago(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CategoriaPagoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CategoriaPagoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CategoriaPagoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.categoriaPago).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
