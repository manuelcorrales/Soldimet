import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoCostoRepuestoUpdateComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto-update.component';
import { EstadoCostoRepuestoService } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.service';
import { EstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';

describe('Component Tests', () => {
  describe('EstadoCostoRepuesto Management Update Component', () => {
    let comp: EstadoCostoRepuestoUpdateComponent;
    let fixture: ComponentFixture<EstadoCostoRepuestoUpdateComponent>;
    let service: EstadoCostoRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoCostoRepuestoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EstadoCostoRepuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoCostoRepuestoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoCostoRepuestoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EstadoCostoRepuesto(123);
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
        const entity = new EstadoCostoRepuesto();
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
