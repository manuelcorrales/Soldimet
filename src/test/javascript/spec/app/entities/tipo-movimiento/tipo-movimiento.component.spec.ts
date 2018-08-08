/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { TipoMovimientoComponent } from 'app/entities/tipo-movimiento/tipo-movimiento.component';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento/tipo-movimiento.service';
import { TipoMovimiento } from 'app/shared/model/tipo-movimiento.model';

describe('Component Tests', () => {
    describe('TipoMovimiento Management Component', () => {
        let comp: TipoMovimientoComponent;
        let fixture: ComponentFixture<TipoMovimientoComponent>;
        let service: TipoMovimientoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoMovimientoComponent],
                providers: []
            })
                .overrideTemplate(TipoMovimientoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoMovimientoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoMovimientoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TipoMovimiento(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tipoMovimientos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
