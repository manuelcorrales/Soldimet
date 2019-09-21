import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MovimientoPresupuestoUpdateComponent } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto-update.component';
import { MovimientoPresupuestoService } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto.service';
import { MovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';

describe('Component Tests', () => {
  describe('MovimientoPresupuesto Management Update Component', () => {
    let comp: MovimientoPresupuestoUpdateComponent;
    let fixture: ComponentFixture<MovimientoPresupuestoUpdateComponent>;
    let service: MovimientoPresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MovimientoPresupuestoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MovimientoPresupuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoPresupuestoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MovimientoPresupuestoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MovimientoPresupuesto(123);
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
        const entity = new MovimientoPresupuesto();
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
