jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EstadoCobranzaOperacionService } from '../service/estado-cobranza-operacion.service';
import { IEstadoCobranzaOperacion, EstadoCobranzaOperacion } from '../estado-cobranza-operacion.model';

import { EstadoCobranzaOperacionUpdateComponent } from './estado-cobranza-operacion-update.component';

describe('Component Tests', () => {
  describe('EstadoCobranzaOperacion Management Update Component', () => {
    let comp: EstadoCobranzaOperacionUpdateComponent;
    let fixture: ComponentFixture<EstadoCobranzaOperacionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let estadoCobranzaOperacionService: EstadoCobranzaOperacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoCobranzaOperacionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EstadoCobranzaOperacionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoCobranzaOperacionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      estadoCobranzaOperacionService = TestBed.inject(EstadoCobranzaOperacionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const estadoCobranzaOperacion: IEstadoCobranzaOperacion = { id: 456 };

        activatedRoute.data = of({ estadoCobranzaOperacion });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(estadoCobranzaOperacion));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoCobranzaOperacion>>();
        const estadoCobranzaOperacion = { id: 123 };
        jest.spyOn(estadoCobranzaOperacionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoCobranzaOperacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoCobranzaOperacion }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(estadoCobranzaOperacionService.update).toHaveBeenCalledWith(estadoCobranzaOperacion);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoCobranzaOperacion>>();
        const estadoCobranzaOperacion = new EstadoCobranzaOperacion();
        jest.spyOn(estadoCobranzaOperacionService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoCobranzaOperacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoCobranzaOperacion }));
        saveSubject.complete();

        // THEN
        expect(estadoCobranzaOperacionService.create).toHaveBeenCalledWith(estadoCobranzaOperacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoCobranzaOperacion>>();
        const estadoCobranzaOperacion = { id: 123 };
        jest.spyOn(estadoCobranzaOperacionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoCobranzaOperacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(estadoCobranzaOperacionService.update).toHaveBeenCalledWith(estadoCobranzaOperacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
