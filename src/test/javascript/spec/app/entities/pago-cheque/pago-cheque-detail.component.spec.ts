/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { PagoChequeDetailComponent } from 'app/entities/pago-cheque/pago-cheque-detail.component';
import { PagoCheque } from 'app/shared/model/pago-cheque.model';

describe('Component Tests', () => {
    describe('PagoCheque Management Detail Component', () => {
        let comp: PagoChequeDetailComponent;
        let fixture: ComponentFixture<PagoChequeDetailComponent>;
        const route = ({ data: of({ pagoCheque: new PagoCheque(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PagoChequeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PagoChequeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PagoChequeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pagoCheque).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
