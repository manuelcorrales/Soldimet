/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoDetallePedidoComponent } from 'app/entities/estado-detalle-pedido/estado-detalle-pedido.component';
import { EstadoDetallePedidoService } from 'app/entities/estado-detalle-pedido/estado-detalle-pedido.service';
import { EstadoDetallePedido } from 'app/shared/model/estado-detalle-pedido.model';

describe('Component Tests', () => {
    describe('EstadoDetallePedido Management Component', () => {
        let comp: EstadoDetallePedidoComponent;
        let fixture: ComponentFixture<EstadoDetallePedidoComponent>;
        let service: EstadoDetallePedidoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoDetallePedidoComponent],
                providers: []
            })
                .overrideTemplate(EstadoDetallePedidoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EstadoDetallePedidoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoDetallePedidoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EstadoDetallePedido(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.estadoDetallePedidos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
