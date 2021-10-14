jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EstadoMovimientoService } from '../service/estado-movimiento.service';
import { IEstadoMovimiento, EstadoMovimiento } from '../estado-movimiento.model';

import { EstadoMovimientoUpdateComponent } from './estado-movimiento-update.component';

describe('Component Tests', () => {
  describe('EstadoMovimiento Management Update Component', () => {
    let comp: EstadoMovimientoUpdateComponent;
    let fixture: ComponentFixture<EstadoMovimientoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let estadoMovimientoService: EstadoMovimientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoMovimientoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EstadoMovimientoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoMovimientoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      estadoMovimientoService = TestBed.inject(EstadoMovimientoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const estadoMovimiento: IEstadoMovimiento = { id: 456 };

        activatedRoute.data = of({ estadoMovimiento });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(estadoMovimiento));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoMovimiento>>();
        const estadoMovimiento = { id: 123 };
        jest.spyOn(estadoMovimientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoMovimiento }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(estadoMovimientoService.update).toHaveBeenCalledWith(estadoMovimiento);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoMovimiento>>();
        const estadoMovimiento = new EstadoMovimiento();
        jest.spyOn(estadoMovimientoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoMovimiento }));
        saveSubject.complete();

        // THEN
        expect(estadoMovimientoService.create).toHaveBeenCalledWith(estadoMovimiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoMovimiento>>();
        const estadoMovimiento = { id: 123 };
        jest.spyOn(estadoMovimientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(estadoMovimientoService.update).toHaveBeenCalledWith(estadoMovimiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
