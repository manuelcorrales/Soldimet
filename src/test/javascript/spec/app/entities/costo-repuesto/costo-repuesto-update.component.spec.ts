import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CostoRepuestoUpdateComponent } from 'app/entities/costo-repuesto/costo-repuesto-update.component';
import { CostoRepuestoService } from 'app/entities/costo-repuesto/costo-repuesto.service';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';

describe('Component Tests', () => {
  describe('CostoRepuesto Management Update Component', () => {
    let comp: CostoRepuestoUpdateComponent;
    let fixture: ComponentFixture<CostoRepuestoUpdateComponent>;
    let service: CostoRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CostoRepuestoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CostoRepuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CostoRepuestoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CostoRepuestoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CostoRepuesto(123);
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
        const entity = new CostoRepuesto();
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
