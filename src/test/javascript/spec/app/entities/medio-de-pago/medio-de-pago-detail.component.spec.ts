/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MedioDePagoDetailComponent } from 'app/entities/medio-de-pago/medio-de-pago-detail.component';
import { MedioDePago } from 'app/shared/model/medio-de-pago.model';

describe('Component Tests', () => {
    describe('MedioDePago Management Detail Component', () => {
        let comp: MedioDePagoDetailComponent;
        let fixture: ComponentFixture<MedioDePagoDetailComponent>;
        const route = ({ data: of({ medioDePago: new MedioDePago(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MedioDePagoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MedioDePagoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedioDePagoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.medioDePago).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
