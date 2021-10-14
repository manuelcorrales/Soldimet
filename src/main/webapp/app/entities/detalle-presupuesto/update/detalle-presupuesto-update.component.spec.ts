jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DetallePresupuestoService } from '../service/detalle-presupuesto.service';
import { IDetallePresupuesto, DetallePresupuesto } from '../detalle-presupuesto.model';
import { IAplicacion } from 'app/entities/aplicacion/aplicacion.model';
import { AplicacionService } from 'app/entities/aplicacion/service/aplicacion.service';
import { ICilindrada } from 'app/entities/cilindrada/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/service/cilindrada.service';
import { IMotor } from 'app/entities/motor/motor.model';
import { MotorService } from 'app/entities/motor/service/motor.service';
import { ITipoParteMotor } from 'app/entities/tipo-parte-motor/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/service/tipo-parte-motor.service';

import { DetallePresupuestoUpdateComponent } from './detalle-presupuesto-update.component';

describe('Component Tests', () => {
  describe('DetallePresupuesto Management Update Component', () => {
    let comp: DetallePresupuestoUpdateComponent;
    let fixture: ComponentFixture<DetallePresupuestoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let detallePresupuestoService: DetallePresupuestoService;
    let aplicacionService: AplicacionService;
    let cilindradaService: CilindradaService;
    let motorService: MotorService;
    let tipoParteMotorService: TipoParteMotorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DetallePresupuestoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DetallePresupuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetallePresupuestoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      detallePresupuestoService = TestBed.inject(DetallePresupuestoService);
      aplicacionService = TestBed.inject(AplicacionService);
      cilindradaService = TestBed.inject(CilindradaService);
      motorService = TestBed.inject(MotorService);
      tipoParteMotorService = TestBed.inject(TipoParteMotorService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Aplicacion query and add missing value', () => {
        const detallePresupuesto: IDetallePresupuesto = { id: 456 };
        const aplicacion: IAplicacion = { id: 89522 };
        detallePresupuesto.aplicacion = aplicacion;

        const aplicacionCollection: IAplicacion[] = [{ id: 939 }];
        jest.spyOn(aplicacionService, 'query').mockReturnValue(of(new HttpResponse({ body: aplicacionCollection })));
        const additionalAplicacions = [aplicacion];
        const expectedCollection: IAplicacion[] = [...additionalAplicacions, ...aplicacionCollection];
        jest.spyOn(aplicacionService, 'addAplicacionToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ detallePresupuesto });
        comp.ngOnInit();

        expect(aplicacionService.query).toHaveBeenCalled();
        expect(aplicacionService.addAplicacionToCollectionIfMissing).toHaveBeenCalledWith(aplicacionCollection, ...additionalAplicacions);
        expect(comp.aplicacionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Cilindrada query and add missing value', () => {
        const detallePresupuesto: IDetallePresupuesto = { id: 456 };
        const cilindrada: ICilindrada = { id: 68282 };
        detallePresupuesto.cilindrada = cilindrada;

        const cilindradaCollection: ICilindrada[] = [{ id: 60848 }];
        jest.spyOn(cilindradaService, 'query').mockReturnValue(of(new HttpResponse({ body: cilindradaCollection })));
        const additionalCilindradas = [cilindrada];
        const expectedCollection: ICilindrada[] = [...additionalCilindradas, ...cilindradaCollection];
        jest.spyOn(cilindradaService, 'addCilindradaToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ detallePresupuesto });
        comp.ngOnInit();

        expect(cilindradaService.query).toHaveBeenCalled();
        expect(cilindradaService.addCilindradaToCollectionIfMissing).toHaveBeenCalledWith(cilindradaCollection, ...additionalCilindradas);
        expect(comp.cilindradasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Motor query and add missing value', () => {
        const detallePresupuesto: IDetallePresupuesto = { id: 456 };
        const motor: IMotor = { id: 79903 };
        detallePresupuesto.motor = motor;

        const motorCollection: IMotor[] = [{ id: 52081 }];
        jest.spyOn(motorService, 'query').mockReturnValue(of(new HttpResponse({ body: motorCollection })));
        const additionalMotors = [motor];
        const expectedCollection: IMotor[] = [...additionalMotors, ...motorCollection];
        jest.spyOn(motorService, 'addMotorToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ detallePresupuesto });
        comp.ngOnInit();

        expect(motorService.query).toHaveBeenCalled();
        expect(motorService.addMotorToCollectionIfMissing).toHaveBeenCalledWith(motorCollection, ...additionalMotors);
        expect(comp.motorsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call TipoParteMotor query and add missing value', () => {
        const detallePresupuesto: IDetallePresupuesto = { id: 456 };
        const tipoParteMotor: ITipoParteMotor = { id: 65851 };
        detallePresupuesto.tipoParteMotor = tipoParteMotor;

        const tipoParteMotorCollection: ITipoParteMotor[] = [{ id: 26052 }];
        jest.spyOn(tipoParteMotorService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoParteMotorCollection })));
        const additionalTipoParteMotors = [tipoParteMotor];
        const expectedCollection: ITipoParteMotor[] = [...additionalTipoParteMotors, ...tipoParteMotorCollection];
        jest.spyOn(tipoParteMotorService, 'addTipoParteMotorToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ detallePresupuesto });
        comp.ngOnInit();

        expect(tipoParteMotorService.query).toHaveBeenCalled();
        expect(tipoParteMotorService.addTipoParteMotorToCollectionIfMissing).toHaveBeenCalledWith(
          tipoParteMotorCollection,
          ...additionalTipoParteMotors
        );
        expect(comp.tipoParteMotorsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const detallePresupuesto: IDetallePresupuesto = { id: 456 };
        const aplicacion: IAplicacion = { id: 84581 };
        detallePresupuesto.aplicacion = aplicacion;
        const cilindrada: ICilindrada = { id: 17215 };
        detallePresupuesto.cilindrada = cilindrada;
        const motor: IMotor = { id: 77541 };
        detallePresupuesto.motor = motor;
        const tipoParteMotor: ITipoParteMotor = { id: 94945 };
        detallePresupuesto.tipoParteMotor = tipoParteMotor;

        activatedRoute.data = of({ detallePresupuesto });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(detallePresupuesto));
        expect(comp.aplicacionsSharedCollection).toContain(aplicacion);
        expect(comp.cilindradasSharedCollection).toContain(cilindrada);
        expect(comp.motorsSharedCollection).toContain(motor);
        expect(comp.tipoParteMotorsSharedCollection).toContain(tipoParteMotor);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DetallePresupuesto>>();
        const detallePresupuesto = { id: 123 };
        jest.spyOn(detallePresupuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ detallePresupuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: detallePresupuesto }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(detallePresupuestoService.update).toHaveBeenCalledWith(detallePresupuesto);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DetallePresupuesto>>();
        const detallePresupuesto = new DetallePresupuesto();
        jest.spyOn(detallePresupuestoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ detallePresupuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: detallePresupuesto }));
        saveSubject.complete();

        // THEN
        expect(detallePresupuestoService.create).toHaveBeenCalledWith(detallePresupuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DetallePresupuesto>>();
        const detallePresupuesto = { id: 123 };
        jest.spyOn(detallePresupuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ detallePresupuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(detallePresupuestoService.update).toHaveBeenCalledWith(detallePresupuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackAplicacionById', () => {
        it('Should return tracked Aplicacion primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackAplicacionById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCilindradaById', () => {
        it('Should return tracked Cilindrada primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCilindradaById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackMotorById', () => {
        it('Should return tracked Motor primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMotorById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackTipoParteMotorById', () => {
        it('Should return tracked TipoParteMotor primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTipoParteMotorById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
