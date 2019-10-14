import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { DetallePedidoUpdateComponent } from 'app/entities/detalle-pedido/detalle-pedido-update.component';
import { DetallePedidoService } from 'app/entities/detalle-pedido/detalle-pedido.service';
import { DetallePedido } from 'app/shared/model/detalle-pedido.model';

describe('Component Tests', () => {
  describe('DetallePedido Management Update Component', () => {
    let comp: DetallePedidoUpdateComponent;
    let fixture: ComponentFixture<DetallePedidoUpdateComponent>;
    let service: DetallePedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [DetallePedidoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DetallePedidoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetallePedidoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetallePedidoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetallePedido(123);
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
        const entity = new DetallePedido();
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
