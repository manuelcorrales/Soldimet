/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { TipoDetalleMovimientoComponent } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.component';
import { TipoDetalleMovimientoService } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.service';
import { TipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';

describe('Component Tests', () => {
    describe('TipoDetalleMovimiento Management Component', () => {
        let comp: TipoDetalleMovimientoComponent;
        let fixture: ComponentFixture<TipoDetalleMovimientoComponent>;
        let service: TipoDetalleMovimientoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoDetalleMovimientoComponent],
                providers: []
            })
                .overrideTemplate(TipoDetalleMovimientoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoDetalleMovimientoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoDetalleMovimientoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TipoDetalleMovimiento(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tipoDetalleMovimientos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
