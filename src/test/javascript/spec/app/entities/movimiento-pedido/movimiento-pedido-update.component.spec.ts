/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MovimientoPedidoUpdateComponent } from 'app/entities/movimiento-pedido/movimiento-pedido-update.component';
import { MovimientoPedidoService } from 'app/entities/movimiento-pedido/movimiento-pedido.service';
import { MovimientoPedido } from 'app/shared/model/movimiento-pedido.model';

describe('Component Tests', () => {
    describe('MovimientoPedido Management Update Component', () => {
        let comp: MovimientoPedidoUpdateComponent;
        let fixture: ComponentFixture<MovimientoPedidoUpdateComponent>;
        let service: MovimientoPedidoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MovimientoPedidoUpdateComponent]
            })
                .overrideTemplate(MovimientoPedidoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MovimientoPedidoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovimientoPedidoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MovimientoPedido(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.movimientoPedido = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MovimientoPedido();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.movimientoPedido = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
