jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MovimientoPresupuestoService } from '../service/movimiento-presupuesto.service';
import { IMovimientoPresupuesto, MovimientoPresupuesto } from '../movimiento-presupuesto.model';
import { IMovimiento } from 'app/entities/movimiento/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento/service/movimiento.service';
import { IPresupuesto } from 'app/entities/presupuesto/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto/service/presupuesto.service';

import { MovimientoPresupuestoUpdateComponent } from './movimiento-presupuesto-update.component';

describe('Component Tests', () => {
  describe('MovimientoPresupuesto Management Update Component', () => {
    let comp: MovimientoPresupuestoUpdateComponent;
    let fixture: ComponentFixture<MovimientoPresupuestoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let movimientoPresupuestoService: MovimientoPresupuestoService;
    let movimientoService: MovimientoService;
    let presupuestoService: PresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MovimientoPresupuestoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MovimientoPresupuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoPresupuestoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      movimientoPresupuestoService = TestBed.inject(MovimientoPresupuestoService);
      movimientoService = TestBed.inject(MovimientoService);
      presupuestoService = TestBed.inject(PresupuestoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call movimiento query and add missing value', () => {
        const movimientoPresupuesto: IMovimientoPresupuesto = { id: 456 };
        const movimiento: IMovimiento = { id: 59994 };
        movimientoPresupuesto.movimiento = movimiento;

        const movimientoCollection: IMovimiento[] = [{ id: 53296 }];
        jest.spyOn(movimientoService, 'query').mockReturnValue(of(new HttpResponse({ body: movimientoCollection })));
        const expectedCollection: IMovimiento[] = [movimiento, ...movimientoCollection];
        jest.spyOn(movimientoService, 'addMovimientoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ movimientoPresupuesto });
        comp.ngOnInit();

        expect(movimientoService.query).toHaveBeenCalled();
        expect(movimientoService.addMovimientoToCollectionIfMissing).toHaveBeenCalledWith(movimientoCollection, movimiento);
        expect(comp.movimientosCollection).toEqual(expectedCollection);
      });

      it('Should call Presupuesto query and add missing value', () => {
        const movimientoPresupuesto: IMovimientoPresupuesto = { id: 456 };
        const presupuesto: IPresupuesto = { id: 90415 };
        movimientoPresupuesto.presupuesto = presupuesto;

        const presupuestoCollection: IPresupuesto[] = [{ id: 53011 }];
        jest.spyOn(presupuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: presupuestoCollection })));
        const additionalPresupuestos = [presupuesto];
        const expectedCollection: IPresupuesto[] = [...additionalPresupuestos, ...presupuestoCollection];
        jest.spyOn(presupuestoService, 'addPresupuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ movimientoPresupuesto });
        comp.ngOnInit();

        expect(presupuestoService.query).toHaveBeenCalled();
        expect(presupuestoService.addPresupuestoToCollectionIfMissing).toHaveBeenCalledWith(
          presupuestoCollection,
          ...additionalPresupuestos
        );
        expect(comp.presupuestosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const movimientoPresupuesto: IMovimientoPresupuesto = { id: 456 };
        const movimiento: IMovimiento = { id: 28322 };
        movimientoPresupuesto.movimiento = movimiento;
        const presupuesto: IPresupuesto = { id: 58371 };
        movimientoPresupuesto.presupuesto = presupuesto;

        activatedRoute.data = of({ movimientoPresupuesto });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(movimientoPresupuesto));
        expect(comp.movimientosCollection).toContain(movimiento);
        expect(comp.presupuestosSharedCollection).toContain(presupuesto);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MovimientoPresupuesto>>();
        const movimientoPresupuesto = { id: 123 };
        jest.spyOn(movimientoPresupuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ movimientoPresupuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: movimientoPresupuesto }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(movimientoPresupuestoService.update).toHaveBeenCalledWith(movimientoPresupuesto);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MovimientoPresupuesto>>();
        const movimientoPresupuesto = new MovimientoPresupuesto();
        jest.spyOn(movimientoPresupuestoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ movimientoPresupuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: movimientoPresupuesto }));
        saveSubject.complete();

        // THEN
        expect(movimientoPresupuestoService.create).toHaveBeenCalledWith(movimientoPresupuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MovimientoPresupuesto>>();
        const movimientoPresupuesto = { id: 123 };
        jest.spyOn(movimientoPresupuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ movimientoPresupuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(movimientoPresupuestoService.update).toHaveBeenCalledWith(movimientoPresupuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackMovimientoById', () => {
        it('Should return tracked Movimiento primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMovimientoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackPresupuestoById', () => {
        it('Should return tracked Presupuesto primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackPresupuestoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
