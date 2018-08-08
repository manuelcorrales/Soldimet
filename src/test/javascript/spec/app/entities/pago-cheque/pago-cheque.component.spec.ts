/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { PagoChequeComponent } from 'app/entities/pago-cheque/pago-cheque.component';
import { PagoChequeService } from 'app/entities/pago-cheque/pago-cheque.service';
import { PagoCheque } from 'app/shared/model/pago-cheque.model';

describe('Component Tests', () => {
    describe('PagoCheque Management Component', () => {
        let comp: PagoChequeComponent;
        let fixture: ComponentFixture<PagoChequeComponent>;
        let service: PagoChequeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PagoChequeComponent],
                providers: []
            })
                .overrideTemplate(PagoChequeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PagoChequeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagoChequeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PagoCheque(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pagoCheques[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
