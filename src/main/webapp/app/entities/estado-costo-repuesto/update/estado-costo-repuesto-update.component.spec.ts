jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EstadoCostoRepuestoService } from '../service/estado-costo-repuesto.service';
import { IEstadoCostoRepuesto, EstadoCostoRepuesto } from '../estado-costo-repuesto.model';

import { EstadoCostoRepuestoUpdateComponent } from './estado-costo-repuesto-update.component';

describe('Component Tests', () => {
  describe('EstadoCostoRepuesto Management Update Component', () => {
    let comp: EstadoCostoRepuestoUpdateComponent;
    let fixture: ComponentFixture<EstadoCostoRepuestoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let estadoCostoRepuestoService: EstadoCostoRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoCostoRepuestoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EstadoCostoRepuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoCostoRepuestoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      estadoCostoRepuestoService = TestBed.inject(EstadoCostoRepuestoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const estadoCostoRepuesto: IEstadoCostoRepuesto = { id: 456 };

        activatedRoute.data = of({ estadoCostoRepuesto });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(estadoCostoRepuesto));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoCostoRepuesto>>();
        const estadoCostoRepuesto = { id: 123 };
        jest.spyOn(estadoCostoRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoCostoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoCostoRepuesto }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(estadoCostoRepuestoService.update).toHaveBeenCalledWith(estadoCostoRepuesto);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoCostoRepuesto>>();
        const estadoCostoRepuesto = new EstadoCostoRepuesto();
        jest.spyOn(estadoCostoRepuestoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoCostoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoCostoRepuesto }));
        saveSubject.complete();

        // THEN
        expect(estadoCostoRepuestoService.create).toHaveBeenCalledWith(estadoCostoRepuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoCostoRepuesto>>();
        const estadoCostoRepuesto = { id: 123 };
        jest.spyOn(estadoCostoRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoCostoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(estadoCostoRepuestoService.update).toHaveBeenCalledWith(estadoCostoRepuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
