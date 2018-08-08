/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { PagoEfectivoComponent } from 'app/entities/pago-efectivo/pago-efectivo.component';
import { PagoEfectivoService } from 'app/entities/pago-efectivo/pago-efectivo.service';
import { PagoEfectivo } from 'app/shared/model/pago-efectivo.model';

describe('Component Tests', () => {
    describe('PagoEfectivo Management Component', () => {
        let comp: PagoEfectivoComponent;
        let fixture: ComponentFixture<PagoEfectivoComponent>;
        let service: PagoEfectivoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PagoEfectivoComponent],
                providers: []
            })
                .overrideTemplate(PagoEfectivoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PagoEfectivoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagoEfectivoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PagoEfectivo(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pagoEfectivos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
