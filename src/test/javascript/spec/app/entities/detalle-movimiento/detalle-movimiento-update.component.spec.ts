import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { DetalleMovimientoUpdateComponent } from 'app/entities/detalle-movimiento/detalle-movimiento-update.component';
import { DetalleMovimientoService } from 'app/entities/detalle-movimiento/detalle-movimiento.service';
import { DetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';

describe('Component Tests', () => {
  describe('DetalleMovimiento Management Update Component', () => {
    let comp: DetalleMovimientoUpdateComponent;
    let fixture: ComponentFixture<DetalleMovimientoUpdateComponent>;
    let service: DetalleMovimientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [DetalleMovimientoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DetalleMovimientoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleMovimientoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleMovimientoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetalleMovimiento(123);
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
        const entity = new DetalleMovimiento();
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
