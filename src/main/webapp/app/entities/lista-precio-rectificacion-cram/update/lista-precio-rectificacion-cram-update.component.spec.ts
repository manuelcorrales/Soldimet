jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ListaPrecioRectificacionCRAMService } from '../service/lista-precio-rectificacion-cram.service';
import { IListaPrecioRectificacionCRAM, ListaPrecioRectificacionCRAM } from '../lista-precio-rectificacion-cram.model';

import { ListaPrecioRectificacionCRAMUpdateComponent } from './lista-precio-rectificacion-cram-update.component';

describe('Component Tests', () => {
  describe('ListaPrecioRectificacionCRAM Management Update Component', () => {
    let comp: ListaPrecioRectificacionCRAMUpdateComponent;
    let fixture: ComponentFixture<ListaPrecioRectificacionCRAMUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ListaPrecioRectificacionCRAMUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ListaPrecioRectificacionCRAMUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListaPrecioRectificacionCRAMUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      listaPrecioRectificacionCRAMService = TestBed.inject(ListaPrecioRectificacionCRAMService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM = { id: 456 };

        activatedRoute.data = of({ listaPrecioRectificacionCRAM });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(listaPrecioRectificacionCRAM));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ListaPrecioRectificacionCRAM>>();
        const listaPrecioRectificacionCRAM = { id: 123 };
        jest.spyOn(listaPrecioRectificacionCRAMService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ listaPrecioRectificacionCRAM });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: listaPrecioRectificacionCRAM }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(listaPrecioRectificacionCRAMService.update).toHaveBeenCalledWith(listaPrecioRectificacionCRAM);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ListaPrecioRectificacionCRAM>>();
        const listaPrecioRectificacionCRAM = new ListaPrecioRectificacionCRAM();
        jest.spyOn(listaPrecioRectificacionCRAMService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ listaPrecioRectificacionCRAM });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: listaPrecioRectificacionCRAM }));
        saveSubject.complete();

        // THEN
        expect(listaPrecioRectificacionCRAMService.create).toHaveBeenCalledWith(listaPrecioRectificacionCRAM);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ListaPrecioRectificacionCRAM>>();
        const listaPrecioRectificacionCRAM = { id: 123 };
        jest.spyOn(listaPrecioRectificacionCRAMService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ listaPrecioRectificacionCRAM });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(listaPrecioRectificacionCRAMService.update).toHaveBeenCalledWith(listaPrecioRectificacionCRAM);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
