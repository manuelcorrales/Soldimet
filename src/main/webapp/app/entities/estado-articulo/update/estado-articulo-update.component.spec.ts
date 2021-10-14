jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EstadoArticuloService } from '../service/estado-articulo.service';
import { IEstadoArticulo, EstadoArticulo } from '../estado-articulo.model';

import { EstadoArticuloUpdateComponent } from './estado-articulo-update.component';

describe('Component Tests', () => {
  describe('EstadoArticulo Management Update Component', () => {
    let comp: EstadoArticuloUpdateComponent;
    let fixture: ComponentFixture<EstadoArticuloUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let estadoArticuloService: EstadoArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoArticuloUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EstadoArticuloUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoArticuloUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      estadoArticuloService = TestBed.inject(EstadoArticuloService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const estadoArticulo: IEstadoArticulo = { id: 456 };

        activatedRoute.data = of({ estadoArticulo });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(estadoArticulo));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoArticulo>>();
        const estadoArticulo = { id: 123 };
        jest.spyOn(estadoArticuloService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoArticulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoArticulo }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(estadoArticuloService.update).toHaveBeenCalledWith(estadoArticulo);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoArticulo>>();
        const estadoArticulo = new EstadoArticulo();
        jest.spyOn(estadoArticuloService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoArticulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoArticulo }));
        saveSubject.complete();

        // THEN
        expect(estadoArticuloService.create).toHaveBeenCalledWith(estadoArticulo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoArticulo>>();
        const estadoArticulo = { id: 123 };
        jest.spyOn(estadoArticuloService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoArticulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(estadoArticuloService.update).toHaveBeenCalledWith(estadoArticulo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
