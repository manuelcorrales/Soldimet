import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MovimientoUpdateComponent } from 'app/entities/movimiento/movimiento-update.component';
import { MovimientoService } from 'app/entities/movimiento/movimiento.service';
import { Movimiento } from 'app/shared/model/movimiento.model';

describe('Component Tests', () => {
  describe('Movimiento Management Update Component', () => {
    let comp: MovimientoUpdateComponent;
    let fixture: ComponentFixture<MovimientoUpdateComponent>;
    let service: MovimientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MovimientoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MovimientoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MovimientoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Movimiento(123);
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
        const entity = new Movimiento();
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
