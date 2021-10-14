jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EstadoPresupuestoService } from '../service/estado-presupuesto.service';
import { IEstadoPresupuesto, EstadoPresupuesto } from '../estado-presupuesto.model';

import { EstadoPresupuestoUpdateComponent } from './estado-presupuesto-update.component';

describe('Component Tests', () => {
  describe('EstadoPresupuesto Management Update Component', () => {
    let comp: EstadoPresupuestoUpdateComponent;
    let fixture: ComponentFixture<EstadoPresupuestoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let estadoPresupuestoService: EstadoPresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoPresupuestoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EstadoPresupuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoPresupuestoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      estadoPresupuestoService = TestBed.inject(EstadoPresupuestoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const estadoPresupuesto: IEstadoPresupuesto = { id: 456 };

        activatedRoute.data = of({ estadoPresupuesto });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(estadoPresupuesto));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoPresupuesto>>();
        const estadoPresupuesto = { id: 123 };
        jest.spyOn(estadoPresupuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoPresupuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoPresupuesto }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(estadoPresupuestoService.update).toHaveBeenCalledWith(estadoPresupuesto);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoPresupuesto>>();
        const estadoPresupuesto = new EstadoPresupuesto();
        jest.spyOn(estadoPresupuestoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoPresupuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoPresupuesto }));
        saveSubject.complete();

        // THEN
        expect(estadoPresupuestoService.create).toHaveBeenCalledWith(estadoPresupuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoPresupuesto>>();
        const estadoPresupuesto = { id: 123 };
        jest.spyOn(estadoPresupuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoPresupuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(estadoPresupuestoService.update).toHaveBeenCalledWith(estadoPresupuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
