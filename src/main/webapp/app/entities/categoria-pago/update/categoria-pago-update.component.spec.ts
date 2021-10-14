jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CategoriaPagoService } from '../service/categoria-pago.service';
import { ICategoriaPago, CategoriaPago } from '../categoria-pago.model';

import { CategoriaPagoUpdateComponent } from './categoria-pago-update.component';

describe('Component Tests', () => {
  describe('CategoriaPago Management Update Component', () => {
    let comp: CategoriaPagoUpdateComponent;
    let fixture: ComponentFixture<CategoriaPagoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let categoriaPagoService: CategoriaPagoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CategoriaPagoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CategoriaPagoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoriaPagoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      categoriaPagoService = TestBed.inject(CategoriaPagoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const categoriaPago: ICategoriaPago = { id: 456 };

        activatedRoute.data = of({ categoriaPago });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(categoriaPago));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CategoriaPago>>();
        const categoriaPago = { id: 123 };
        jest.spyOn(categoriaPagoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ categoriaPago });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: categoriaPago }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(categoriaPagoService.update).toHaveBeenCalledWith(categoriaPago);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CategoriaPago>>();
        const categoriaPago = new CategoriaPago();
        jest.spyOn(categoriaPagoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ categoriaPago });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: categoriaPago }));
        saveSubject.complete();

        // THEN
        expect(categoriaPagoService.create).toHaveBeenCalledWith(categoriaPago);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CategoriaPago>>();
        const categoriaPago = { id: 123 };
        jest.spyOn(categoriaPagoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ categoriaPago });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(categoriaPagoService.update).toHaveBeenCalledWith(categoriaPago);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
