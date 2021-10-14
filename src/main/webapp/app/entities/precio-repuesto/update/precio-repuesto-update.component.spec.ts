jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PrecioRepuestoService } from '../service/precio-repuesto.service';
import { IPrecioRepuesto, PrecioRepuesto } from '../precio-repuesto.model';

import { PrecioRepuestoUpdateComponent } from './precio-repuesto-update.component';

describe('Component Tests', () => {
  describe('PrecioRepuesto Management Update Component', () => {
    let comp: PrecioRepuestoUpdateComponent;
    let fixture: ComponentFixture<PrecioRepuestoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let precioRepuestoService: PrecioRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PrecioRepuestoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PrecioRepuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrecioRepuestoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      precioRepuestoService = TestBed.inject(PrecioRepuestoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const precioRepuesto: IPrecioRepuesto = { id: 456 };

        activatedRoute.data = of({ precioRepuesto });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(precioRepuesto));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PrecioRepuesto>>();
        const precioRepuesto = { id: 123 };
        jest.spyOn(precioRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ precioRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: precioRepuesto }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(precioRepuestoService.update).toHaveBeenCalledWith(precioRepuesto);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PrecioRepuesto>>();
        const precioRepuesto = new PrecioRepuesto();
        jest.spyOn(precioRepuestoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ precioRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: precioRepuesto }));
        saveSubject.complete();

        // THEN
        expect(precioRepuestoService.create).toHaveBeenCalledWith(precioRepuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PrecioRepuesto>>();
        const precioRepuesto = { id: 123 };
        jest.spyOn(precioRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ precioRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(precioRepuestoService.update).toHaveBeenCalledWith(precioRepuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
