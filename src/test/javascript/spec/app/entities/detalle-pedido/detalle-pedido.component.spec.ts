/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { DetallePedidoComponent } from 'app/entities/detalle-pedido/detalle-pedido.component';
import { DetallePedidoService } from 'app/entities/detalle-pedido/detalle-pedido.service';
import { DetallePedido } from 'app/shared/model/detalle-pedido.model';

describe('Component Tests', () => {
    describe('DetallePedido Management Component', () => {
        let comp: DetallePedidoComponent;
        let fixture: ComponentFixture<DetallePedidoComponent>;
        let service: DetallePedidoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [DetallePedidoComponent],
                providers: []
            })
                .overrideTemplate(DetallePedidoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DetallePedidoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetallePedidoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DetallePedido(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.detallePedidos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
