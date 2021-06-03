import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MedidaArticuloUpdateComponent } from 'app/entities/medida-articulo/medida-articulo-update.component';
import { MedidaArticuloService } from 'app/entities/medida-articulo/medida-articulo.service';
import { MedidaArticulo } from 'app/shared/model/medida-articulo.model';

describe('Component Tests', () => {
  describe('MedidaArticulo Management Update Component', () => {
    let comp: MedidaArticuloUpdateComponent;
    let fixture: ComponentFixture<MedidaArticuloUpdateComponent>;
    let service: MedidaArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MedidaArticuloUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MedidaArticuloUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedidaArticuloUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedidaArticuloService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MedidaArticulo(123);
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
        const entity = new MedidaArticulo();
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
