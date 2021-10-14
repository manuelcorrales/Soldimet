jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CostoOperacionService } from '../service/costo-operacion.service';
import { ICostoOperacion, CostoOperacion } from '../costo-operacion.model';
import { ICilindrada } from 'app/entities/cilindrada/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/service/cilindrada.service';
import { IOperacion } from 'app/entities/operacion/operacion.model';
import { OperacionService } from 'app/entities/operacion/service/operacion.service';
import { ITipoParteMotor } from 'app/entities/tipo-parte-motor/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/service/tipo-parte-motor.service';

import { CostoOperacionUpdateComponent } from './costo-operacion-update.component';

describe('Component Tests', () => {
  describe('CostoOperacion Management Update Component', () => {
    let comp: CostoOperacionUpdateComponent;
    let fixture: ComponentFixture<CostoOperacionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let costoOperacionService: CostoOperacionService;
    let cilindradaService: CilindradaService;
    let operacionService: OperacionService;
    let tipoParteMotorService: TipoParteMotorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CostoOperacionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CostoOperacionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CostoOperacionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      costoOperacionService = TestBed.inject(CostoOperacionService);
      cilindradaService = TestBed.inject(CilindradaService);
      operacionService = TestBed.inject(OperacionService);
      tipoParteMotorService = TestBed.inject(TipoParteMotorService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Cilindrada query and add missing value', () => {
        const costoOperacion: ICostoOperacion = { id: 456 };
        const cilindrada: ICilindrada = { id: 55556 };
        costoOperacion.cilindrada = cilindrada;

        const cilindradaCollection: ICilindrada[] = [{ id: 62424 }];
        jest.spyOn(cilindradaService, 'query').mockReturnValue(of(new HttpResponse({ body: cilindradaCollection })));
        const additionalCilindradas = [cilindrada];
        const expectedCollection: ICilindrada[] = [...additionalCilindradas, ...cilindradaCollection];
        jest.spyOn(cilindradaService, 'addCilindradaToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ costoOperacion });
        comp.ngOnInit();

        expect(cilindradaService.query).toHaveBeenCalled();
        expect(cilindradaService.addCilindradaToCollectionIfMissing).toHaveBeenCalledWith(cilindradaCollection, ...additionalCilindradas);
        expect(comp.cilindradasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Operacion query and add missing value', () => {
        const costoOperacion: ICostoOperacion = { id: 456 };
        const operacion: IOperacion = { id: 39511 };
        costoOperacion.operacion = operacion;

        const operacionCollection: IOperacion[] = [{ id: 84385 }];
        jest.spyOn(operacionService, 'query').mockReturnValue(of(new HttpResponse({ body: operacionCollection })));
        const additionalOperacions = [operacion];
        const expectedCollection: IOperacion[] = [...additionalOperacions, ...operacionCollection];
        jest.spyOn(operacionService, 'addOperacionToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ costoOperacion });
        comp.ngOnInit();

        expect(operacionService.query).toHaveBeenCalled();
        expect(operacionService.addOperacionToCollectionIfMissing).toHaveBeenCalledWith(operacionCollection, ...additionalOperacions);
        expect(comp.operacionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call TipoParteMotor query and add missing value', () => {
        const costoOperacion: ICostoOperacion = { id: 456 };
        const tipoParteMotor: ITipoParteMotor = { id: 3417 };
        costoOperacion.tipoParteMotor = tipoParteMotor;

        const tipoParteMotorCollection: ITipoParteMotor[] = [{ id: 56419 }];
        jest.spyOn(tipoParteMotorService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoParteMotorCollection })));
        const additionalTipoParteMotors = [tipoParteMotor];
        const expectedCollection: ITipoParteMotor[] = [...additionalTipoParteMotors, ...tipoParteMotorCollection];
        jest.spyOn(tipoParteMotorService, 'addTipoParteMotorToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ costoOperacion });
        comp.ngOnInit();

        expect(tipoParteMotorService.query).toHaveBeenCalled();
        expect(tipoParteMotorService.addTipoParteMotorToCollectionIfMissing).toHaveBeenCalledWith(
          tipoParteMotorCollection,
          ...additionalTipoParteMotors
        );
        expect(comp.tipoParteMotorsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const costoOperacion: ICostoOperacion = { id: 456 };
        const cilindrada: ICilindrada = { id: 39665 };
        costoOperacion.cilindrada = cilindrada;
        const operacion: IOperacion = { id: 32002 };
        costoOperacion.operacion = operacion;
        const tipoParteMotor: ITipoParteMotor = { id: 21242 };
        costoOperacion.tipoParteMotor = tipoParteMotor;

        activatedRoute.data = of({ costoOperacion });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(costoOperacion));
        expect(comp.cilindradasSharedCollection).toContain(cilindrada);
        expect(comp.operacionsSharedCollection).toContain(operacion);
        expect(comp.tipoParteMotorsSharedCollection).toContain(tipoParteMotor);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CostoOperacion>>();
        const costoOperacion = { id: 123 };
        jest.spyOn(costoOperacionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ costoOperacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: costoOperacion }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(costoOperacionService.update).toHaveBeenCalledWith(costoOperacion);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CostoOperacion>>();
        const costoOperacion = new CostoOperacion();
        jest.spyOn(costoOperacionService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ costoOperacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: costoOperacion }));
        saveSubject.complete();

        // THEN
        expect(costoOperacionService.create).toHaveBeenCalledWith(costoOperacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CostoOperacion>>();
        const costoOperacion = { id: 123 };
        jest.spyOn(costoOperacionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ costoOperacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(costoOperacionService.update).toHaveBeenCalledWith(costoOperacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackCilindradaById', () => {
        it('Should return tracked Cilindrada primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCilindradaById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackOperacionById', () => {
        it('Should return tracked Operacion primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackOperacionById(0, entity);
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
