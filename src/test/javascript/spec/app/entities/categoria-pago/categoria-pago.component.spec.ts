/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { CategoriaPagoComponent } from 'app/entities/categoria-pago/categoria-pago.component';
import { CategoriaPagoService } from 'app/entities/categoria-pago/categoria-pago.service';
import { CategoriaPago } from 'app/shared/model/categoria-pago.model';

describe('Component Tests', () => {
    describe('CategoriaPago Management Component', () => {
        let comp: CategoriaPagoComponent;
        let fixture: ComponentFixture<CategoriaPagoComponent>;
        let service: CategoriaPagoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CategoriaPagoComponent],
                providers: []
            })
                .overrideTemplate(CategoriaPagoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategoriaPagoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriaPagoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CategoriaPago(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.categoriaPagos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
