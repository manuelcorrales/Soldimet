/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoPedidoRepuestoUpdateComponent } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto-update.component';
import { EstadoPedidoRepuestoService } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.service';
import { EstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';

describe('Component Tests', () => {
    describe('EstadoPedidoRepuesto Management Update Component', () => {
        let comp: EstadoPedidoRepuestoUpdateComponent;
        let fixture: ComponentFixture<EstadoPedidoRepuestoUpdateComponent>;
        let service: EstadoPedidoRepuestoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoPedidoRepuestoUpdateComponent]
            })
                .overrideTemplate(EstadoPedidoRepuestoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EstadoPedidoRepuestoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoPedidoRepuestoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EstadoPedidoRepuesto(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.estadoPedidoRepuesto = entity;
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
                    const entity = new EstadoPedidoRepuesto();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.estadoPedidoRepuesto = entity;
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
