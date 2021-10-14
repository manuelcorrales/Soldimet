jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MedidaArticuloService } from '../service/medida-articulo.service';
import { IMedidaArticulo, MedidaArticulo } from '../medida-articulo.model';

import { MedidaArticuloUpdateComponent } from './medida-articulo-update.component';

describe('Component Tests', () => {
  describe('MedidaArticulo Management Update Component', () => {
    let comp: MedidaArticuloUpdateComponent;
    let fixture: ComponentFixture<MedidaArticuloUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let medidaArticuloService: MedidaArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MedidaArticuloUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MedidaArticuloUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedidaArticuloUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      medidaArticuloService = TestBed.inject(MedidaArticuloService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const medidaArticulo: IMedidaArticulo = { id: 456 };

        activatedRoute.data = of({ medidaArticulo });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(medidaArticulo));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MedidaArticulo>>();
        const medidaArticulo = { id: 123 };
        jest.spyOn(medidaArticuloService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ medidaArticulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: medidaArticulo }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(medidaArticuloService.update).toHaveBeenCalledWith(medidaArticulo);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MedidaArticulo>>();
        const medidaArticulo = new MedidaArticulo();
        jest.spyOn(medidaArticuloService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ medidaArticulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: medidaArticulo }));
        saveSubject.complete();

        // THEN
        expect(medidaArticuloService.create).toHaveBeenCalledWith(medidaArticulo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MedidaArticulo>>();
        const medidaArticulo = { id: 123 };
        jest.spyOn(medidaArticuloService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ medidaArticulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(medidaArticuloService.update).toHaveBeenCalledWith(medidaArticulo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
