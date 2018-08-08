/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { PedidoRepuestoUpdateComponent } from 'app/entities/pedido-repuesto/pedido-repuesto-update.component';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto/pedido-repuesto.service';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';

describe('Component Tests', () => {
    describe('PedidoRepuesto Management Update Component', () => {
        let comp: PedidoRepuestoUpdateComponent;
        let fixture: ComponentFixture<PedidoRepuestoUpdateComponent>;
        let service: PedidoRepuestoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PedidoRepuestoUpdateComponent]
            })
                .overrideTemplate(PedidoRepuestoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PedidoRepuestoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PedidoRepuestoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PedidoRepuesto(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pedidoRepuesto = entity;
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
                    const entity = new PedidoRepuesto();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pedidoRepuesto = entity;
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
