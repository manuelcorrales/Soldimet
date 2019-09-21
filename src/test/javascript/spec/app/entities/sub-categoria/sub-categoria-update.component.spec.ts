import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { SubCategoriaUpdateComponent } from 'app/entities/sub-categoria/sub-categoria-update.component';
import { SubCategoriaService } from 'app/entities/sub-categoria/sub-categoria.service';
import { SubCategoria } from 'app/shared/model/sub-categoria.model';

describe('Component Tests', () => {
  describe('SubCategoria Management Update Component', () => {
    let comp: SubCategoriaUpdateComponent;
    let fixture: ComponentFixture<SubCategoriaUpdateComponent>;
    let service: SubCategoriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [SubCategoriaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SubCategoriaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubCategoriaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubCategoriaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubCategoria(123);
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
        const entity = new SubCategoria();
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
