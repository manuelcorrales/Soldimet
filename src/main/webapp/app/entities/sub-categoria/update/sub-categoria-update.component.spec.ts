jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SubCategoriaService } from '../service/sub-categoria.service';
import { ISubCategoria, SubCategoria } from '../sub-categoria.model';

import { SubCategoriaUpdateComponent } from './sub-categoria-update.component';

describe('Component Tests', () => {
  describe('SubCategoria Management Update Component', () => {
    let comp: SubCategoriaUpdateComponent;
    let fixture: ComponentFixture<SubCategoriaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let subCategoriaService: SubCategoriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SubCategoriaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SubCategoriaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubCategoriaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      subCategoriaService = TestBed.inject(SubCategoriaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const subCategoria: ISubCategoria = { id: 456 };

        activatedRoute.data = of({ subCategoria });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(subCategoria));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<SubCategoria>>();
        const subCategoria = { id: 123 };
        jest.spyOn(subCategoriaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ subCategoria });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: subCategoria }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(subCategoriaService.update).toHaveBeenCalledWith(subCategoria);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<SubCategoria>>();
        const subCategoria = new SubCategoria();
        jest.spyOn(subCategoriaService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ subCategoria });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: subCategoria }));
        saveSubject.complete();

        // THEN
        expect(subCategoriaService.create).toHaveBeenCalledWith(subCategoria);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<SubCategoria>>();
        const subCategoria = { id: 123 };
        jest.spyOn(subCategoriaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ subCategoria });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(subCategoriaService.update).toHaveBeenCalledWith(subCategoria);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
