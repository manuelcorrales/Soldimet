/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoPedidoRepuestoComponent } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.component';
import { EstadoPedidoRepuestoService } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.service';
import { EstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';

describe('Component Tests', () => {
    describe('EstadoPedidoRepuesto Management Component', () => {
        let comp: EstadoPedidoRepuestoComponent;
        let fixture: ComponentFixture<EstadoPedidoRepuestoComponent>;
        let service: EstadoPedidoRepuestoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoPedidoRepuestoComponent],
                providers: []
            })
                .overrideTemplate(EstadoPedidoRepuestoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EstadoPedidoRepuestoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoPedidoRepuestoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EstadoPedidoRepuesto(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.estadoPedidoRepuestos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
