import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoDetallePedidoUpdateComponent } from 'app/entities/estado-detalle-pedido/estado-detalle-pedido-update.component';
import { EstadoDetallePedidoService } from 'app/entities/estado-detalle-pedido/estado-detalle-pedido.service';
import { EstadoDetallePedido } from 'app/shared/model/estado-detalle-pedido.model';

describe('Component Tests', () => {
  describe('EstadoDetallePedido Management Update Component', () => {
    let comp: EstadoDetallePedidoUpdateComponent;
    let fixture: ComponentFixture<EstadoDetallePedidoUpdateComponent>;
    let service: EstadoDetallePedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoDetallePedidoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EstadoDetallePedidoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoDetallePedidoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoDetallePedidoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EstadoDetallePedido(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new EstadoDetallePedido();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
