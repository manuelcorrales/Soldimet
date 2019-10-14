import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CobranzaRepuestoUpdateComponent } from 'app/entities/cobranza-repuesto/cobranza-repuesto-update.component';
import { CobranzaRepuestoService } from 'app/entities/cobranza-repuesto/cobranza-repuesto.service';
import { CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';

describe('Component Tests', () => {
  describe('CobranzaRepuesto Management Update Component', () => {
    let comp: CobranzaRepuestoUpdateComponent;
    let fixture: ComponentFixture<CobranzaRepuestoUpdateComponent>;
    let service: CobranzaRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CobranzaRepuestoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CobranzaRepuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CobranzaRepuestoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CobranzaRepuestoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CobranzaRepuesto(123);
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
        const entity = new CobranzaRepuesto();
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
