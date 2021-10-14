jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CilindradaService } from '../service/cilindrada.service';
import { ICilindrada, Cilindrada } from '../cilindrada.model';

import { CilindradaUpdateComponent } from './cilindrada-update.component';

describe('Component Tests', () => {
  describe('Cilindrada Management Update Component', () => {
    let comp: CilindradaUpdateComponent;
    let fixture: ComponentFixture<CilindradaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cilindradaService: CilindradaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CilindradaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CilindradaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CilindradaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cilindradaService = TestBed.inject(CilindradaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cilindrada: ICilindrada = { id: 456 };

        activatedRoute.data = of({ cilindrada });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cilindrada));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Cilindrada>>();
        const cilindrada = { id: 123 };
        jest.spyOn(cilindradaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cilindrada });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cilindrada }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cilindradaService.update).toHaveBeenCalledWith(cilindrada);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Cilindrada>>();
        const cilindrada = new Cilindrada();
        jest.spyOn(cilindradaService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cilindrada });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cilindrada }));
        saveSubject.complete();

        // THEN
        expect(cilindradaService.create).toHaveBeenCalledWith(cilindrada);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Cilindrada>>();
        const cilindrada = { id: 123 };
        jest.spyOn(cilindradaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cilindrada });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cilindradaService.update).toHaveBeenCalledWith(cilindrada);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
