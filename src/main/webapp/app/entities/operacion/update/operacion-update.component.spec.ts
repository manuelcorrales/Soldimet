jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { OperacionService } from '../service/operacion.service';
import { IOperacion, Operacion } from '../operacion.model';
import { ITipoParteMotor } from 'app/entities/tipo-parte-motor/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/service/tipo-parte-motor.service';
import { IEstadoOperacion } from 'app/entities/estado-operacion/estado-operacion.model';
import { EstadoOperacionService } from 'app/entities/estado-operacion/service/estado-operacion.service';

import { OperacionUpdateComponent } from './operacion-update.component';

describe('Component Tests', () => {
  describe('Operacion Management Update Component', () => {
    let comp: OperacionUpdateComponent;
    let fixture: ComponentFixture<OperacionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let operacionService: OperacionService;
    let tipoParteMotorService: TipoParteMotorService;
    let estadoOperacionService: EstadoOperacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [OperacionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(OperacionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OperacionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      operacionService = TestBed.inject(OperacionService);
      tipoParteMotorService = TestBed.inject(TipoParteMotorService);
      estadoOperacionService = TestBed.inject(EstadoOperacionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call TipoParteMotor query and add missing value', () => {
        const operacion: IOperacion = { id: 456 };
        const tipoParteMotor: ITipoParteMotor = { id: 56756 };
        operacion.tipoParteMotor = tipoParteMotor;

        const tipoParteMotorCollection: ITipoParteMotor[] = [{ id: 8752 }];
        jest.spyOn(tipoParteMotorService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoParteMotorCollection })));
        const additionalTipoParteMotors = [tipoParteMotor];
        const expectedCollection: ITipoParteMotor[] = [...additionalTipoParteMotors, ...tipoParteMotorCollection];
        jest.spyOn(tipoParteMotorService, 'addTipoParteMotorToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ operacion });
        comp.ngOnInit();

        expect(tipoParteMotorService.query).toHaveBeenCalled();
        expect(tipoParteMotorService.addTipoParteMotorToCollectionIfMissing).toHaveBeenCalledWith(
          tipoParteMotorCollection,
          ...additionalTipoParteMotors
        );
        expect(comp.tipoParteMotorsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call EstadoOperacion query and add missing value', () => {
        const operacion: IOperacion = { id: 456 };
        const estadoOperacion: IEstadoOperacion = { id: 77723 };
        operacion.estadoOperacion = estadoOperacion;

        const estadoOperacionCollection: IEstadoOperacion[] = [{ id: 60833 }];
        jest.spyOn(estadoOperacionService, 'query').mockReturnValue(of(new HttpResponse({ body: estadoOperacionCollection })));
        const additionalEstadoOperacions = [estadoOperacion];
        const expectedCollection: IEstadoOperacion[] = [...additionalEstadoOperacions, ...estadoOperacionCollection];
        jest.spyOn(estadoOperacionService, 'addEstadoOperacionToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ operacion });
        comp.ngOnInit();

        expect(estadoOperacionService.query).toHaveBeenCalled();
        expect(estadoOperacionService.addEstadoOperacionToCollectionIfMissing).toHaveBeenCalledWith(
          estadoOperacionCollection,
          ...additionalEstadoOperacions
        );
        expect(comp.estadoOperacionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const operacion: IOperacion = { id: 456 };
        const tipoParteMotor: ITipoParteMotor = { id: 60820 };
        operacion.tipoParteMotor = tipoParteMotor;
        const estadoOperacion: IEstadoOperacion = { id: 95069 };
        operacion.estadoOperacion = estadoOperacion;

        activatedRoute.data = of({ operacion });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(operacion));
        expect(comp.tipoParteMotorsSharedCollection).toContain(tipoParteMotor);
        expect(comp.estadoOperacionsSharedCollection).toContain(estadoOperacion);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Operacion>>();
        const operacion = { id: 123 };
        jest.spyOn(operacionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ operacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: operacion }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(operacionService.update).toHaveBeenCalledWith(operacion);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Operacion>>();
        const operacion = new Operacion();
        jest.spyOn(operacionService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ operacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: operacion }));
        saveSubject.complete();

        // THEN
        expect(operacionService.create).toHaveBeenCalledWith(operacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Operacion>>();
        const operacion = { id: 123 };
        jest.spyOn(operacionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ operacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(operacionService.update).toHaveBeenCalledWith(operacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackTipoParteMotorById', () => {
        it('Should return tracked TipoParteMotor primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTipoParteMotorById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackEstadoOperacionById', () => {
        it('Should return tracked EstadoOperacion primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEstadoOperacionById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
