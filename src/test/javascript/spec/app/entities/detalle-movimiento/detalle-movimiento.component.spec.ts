/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { DetalleMovimientoComponent } from 'app/entities/detalle-movimiento/detalle-movimiento.component';
import { DetalleMovimientoService } from 'app/entities/detalle-movimiento/detalle-movimiento.service';
import { DetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';

describe('Component Tests', () => {
    describe('DetalleMovimiento Management Component', () => {
        let comp: DetalleMovimientoComponent;
        let fixture: ComponentFixture<DetalleMovimientoComponent>;
        let service: DetalleMovimientoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [DetalleMovimientoComponent],
                providers: []
            })
                .overrideTemplate(DetalleMovimientoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DetalleMovimientoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetalleMovimientoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DetalleMovimiento(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.detalleMovimientos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
