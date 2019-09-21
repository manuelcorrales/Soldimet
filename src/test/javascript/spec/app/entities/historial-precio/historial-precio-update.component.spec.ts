import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { HistorialPrecioUpdateComponent } from 'app/entities/historial-precio/historial-precio-update.component';
import { HistorialPrecioService } from 'app/entities/historial-precio/historial-precio.service';
import { HistorialPrecio } from 'app/shared/model/historial-precio.model';

describe('Component Tests', () => {
  describe('HistorialPrecio Management Update Component', () => {
    let comp: HistorialPrecioUpdateComponent;
    let fixture: ComponentFixture<HistorialPrecioUpdateComponent>;
    let service: HistorialPrecioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [HistorialPrecioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HistorialPrecioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistorialPrecioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistorialPrecioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HistorialPrecio(123);
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
        const entity = new HistorialPrecio();
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
