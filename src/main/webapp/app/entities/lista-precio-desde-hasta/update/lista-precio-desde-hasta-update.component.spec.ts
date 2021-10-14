jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ListaPrecioDesdeHastaService } from '../service/lista-precio-desde-hasta.service';
import { IListaPrecioDesdeHasta, ListaPrecioDesdeHasta } from '../lista-precio-desde-hasta.model';

import { ListaPrecioDesdeHastaUpdateComponent } from './lista-precio-desde-hasta-update.component';

describe('Component Tests', () => {
  describe('ListaPrecioDesdeHasta Management Update Component', () => {
    let comp: ListaPrecioDesdeHastaUpdateComponent;
    let fixture: ComponentFixture<ListaPrecioDesdeHastaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let listaPrecioDesdeHastaService: ListaPrecioDesdeHastaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ListaPrecioDesdeHastaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ListaPrecioDesdeHastaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListaPrecioDesdeHastaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      listaPrecioDesdeHastaService = TestBed.inject(ListaPrecioDesdeHastaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const listaPrecioDesdeHasta: IListaPrecioDesdeHasta = { id: 456 };

        activatedRoute.data = of({ listaPrecioDesdeHasta });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(listaPrecioDesdeHasta));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ListaPrecioDesdeHasta>>();
        const listaPrecioDesdeHasta = { id: 123 };
        jest.spyOn(listaPrecioDesdeHastaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ listaPrecioDesdeHasta });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: listaPrecioDesdeHasta }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(listaPrecioDesdeHastaService.update).toHaveBeenCalledWith(listaPrecioDesdeHasta);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ListaPrecioDesdeHasta>>();
        const listaPrecioDesdeHasta = new ListaPrecioDesdeHasta();
        jest.spyOn(listaPrecioDesdeHastaService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ listaPrecioDesdeHasta });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: listaPrecioDesdeHasta }));
        saveSubject.complete();

        // THEN
        expect(listaPrecioDesdeHastaService.create).toHaveBeenCalledWith(listaPrecioDesdeHasta);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ListaPrecioDesdeHasta>>();
        const listaPrecioDesdeHasta = { id: 123 };
        jest.spyOn(listaPrecioDesdeHastaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ listaPrecioDesdeHasta });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(listaPrecioDesdeHastaService.update).toHaveBeenCalledWith(listaPrecioDesdeHasta);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
