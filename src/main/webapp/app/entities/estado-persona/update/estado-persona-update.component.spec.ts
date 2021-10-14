jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EstadoPersonaService } from '../service/estado-persona.service';
import { IEstadoPersona, EstadoPersona } from '../estado-persona.model';

import { EstadoPersonaUpdateComponent } from './estado-persona-update.component';

describe('Component Tests', () => {
  describe('EstadoPersona Management Update Component', () => {
    let comp: EstadoPersonaUpdateComponent;
    let fixture: ComponentFixture<EstadoPersonaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let estadoPersonaService: EstadoPersonaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoPersonaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EstadoPersonaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoPersonaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      estadoPersonaService = TestBed.inject(EstadoPersonaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const estadoPersona: IEstadoPersona = { id: 456 };

        activatedRoute.data = of({ estadoPersona });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(estadoPersona));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoPersona>>();
        const estadoPersona = { id: 123 };
        jest.spyOn(estadoPersonaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoPersona });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoPersona }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(estadoPersonaService.update).toHaveBeenCalledWith(estadoPersona);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoPersona>>();
        const estadoPersona = new EstadoPersona();
        jest.spyOn(estadoPersonaService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoPersona });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoPersona }));
        saveSubject.complete();

        // THEN
        expect(estadoPersonaService.create).toHaveBeenCalledWith(estadoPersona);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoPersona>>();
        const estadoPersona = { id: 123 };
        jest.spyOn(estadoPersonaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoPersona });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(estadoPersonaService.update).toHaveBeenCalledWith(estadoPersona);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
