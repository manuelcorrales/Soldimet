import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoOperacionUpdateComponent } from 'app/entities/estado-operacion/estado-operacion-update.component';
import { EstadoOperacionService } from 'app/entities/estado-operacion/estado-operacion.service';
import { EstadoOperacion } from 'app/shared/model/estado-operacion.model';

describe('Component Tests', () => {
  describe('EstadoOperacion Management Update Component', () => {
    let comp: EstadoOperacionUpdateComponent;
    let fixture: ComponentFixture<EstadoOperacionUpdateComponent>;
    let service: EstadoOperacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoOperacionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EstadoOperacionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoOperacionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoOperacionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EstadoOperacion(123);
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
        const entity = new EstadoOperacion();
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
