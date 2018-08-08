/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CajaDetailComponent } from 'app/entities/caja/caja-detail.component';
import { Caja } from 'app/shared/model/caja.model';

describe('Component Tests', () => {
    describe('Caja Management Detail Component', () => {
        let comp: CajaDetailComponent;
        let fixture: ComponentFixture<CajaDetailComponent>;
        const route = ({ data: of({ caja: new Caja(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CajaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CajaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CajaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.caja).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
