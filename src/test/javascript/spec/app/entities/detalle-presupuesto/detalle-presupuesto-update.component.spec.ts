import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { DetallePresupuestoUpdateComponent } from 'app/entities/detalle-presupuesto/detalle-presupuesto-update.component';
import { DetallePresupuestoService } from 'app/entities/detalle-presupuesto/detalle-presupuesto.service';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';

describe('Component Tests', () => {
  describe('DetallePresupuesto Management Update Component', () => {
    let comp: DetallePresupuestoUpdateComponent;
    let fixture: ComponentFixture<DetallePresupuestoUpdateComponent>;
    let service: DetallePresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [DetallePresupuestoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DetallePresupuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetallePresupuestoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetallePresupuestoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetallePresupuesto(123);
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
        const entity = new DetallePresupuesto();
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
