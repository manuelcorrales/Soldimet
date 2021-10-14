jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EstadoOperacionService } from '../service/estado-operacion.service';
import { IEstadoOperacion, EstadoOperacion } from '../estado-operacion.model';

import { EstadoOperacionUpdateComponent } from './estado-operacion-update.component';

describe('Component Tests', () => {
  describe('EstadoOperacion Management Update Component', () => {
    let comp: EstadoOperacionUpdateComponent;
    let fixture: ComponentFixture<EstadoOperacionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let estadoOperacionService: EstadoOperacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoOperacionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EstadoOperacionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoOperacionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      estadoOperacionService = TestBed.inject(EstadoOperacionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const estadoOperacion: IEstadoOperacion = { id: 456 };

        activatedRoute.data = of({ estadoOperacion });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(estadoOperacion));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoOperacion>>();
        const estadoOperacion = { id: 123 };
        jest.spyOn(estadoOperacionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoOperacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoOperacion }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(estadoOperacionService.update).toHaveBeenCalledWith(estadoOperacion);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoOperacion>>();
        const estadoOperacion = new EstadoOperacion();
        jest.spyOn(estadoOperacionService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoOperacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoOperacion }));
        saveSubject.complete();

        // THEN
        expect(estadoOperacionService.create).toHaveBeenCalledWith(estadoOperacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoOperacion>>();
        const estadoOperacion = { id: 123 };
        jest.spyOn(estadoOperacionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoOperacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(estadoOperacionService.update).toHaveBeenCalledWith(estadoOperacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
