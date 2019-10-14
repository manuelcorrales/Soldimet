import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CobranzaOperacionUpdateComponent } from 'app/entities/cobranza-operacion/cobranza-operacion-update.component';
import { CobranzaOperacionService } from 'app/entities/cobranza-operacion/cobranza-operacion.service';
import { CobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';

describe('Component Tests', () => {
  describe('CobranzaOperacion Management Update Component', () => {
    let comp: CobranzaOperacionUpdateComponent;
    let fixture: ComponentFixture<CobranzaOperacionUpdateComponent>;
    let service: CobranzaOperacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CobranzaOperacionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CobranzaOperacionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CobranzaOperacionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CobranzaOperacionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CobranzaOperacion(123);
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
        const entity = new CobranzaOperacion();
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
