/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { DetallePresupuestoComponent } from 'app/entities/detalle-presupuesto/detalle-presupuesto.component';
import { DetallePresupuestoService } from 'app/entities/detalle-presupuesto/detalle-presupuesto.service';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';

describe('Component Tests', () => {
    describe('DetallePresupuesto Management Component', () => {
        let comp: DetallePresupuestoComponent;
        let fixture: ComponentFixture<DetallePresupuestoComponent>;
        let service: DetallePresupuestoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [DetallePresupuestoComponent],
                providers: []
            })
                .overrideTemplate(DetallePresupuestoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DetallePresupuestoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetallePresupuestoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DetallePresupuesto(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.detallePresupuestos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
