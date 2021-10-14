jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AplicacionService } from '../service/aplicacion.service';
import { IAplicacion, Aplicacion } from '../aplicacion.model';
import { IMotor } from 'app/entities/motor/motor.model';
import { MotorService } from 'app/entities/motor/service/motor.service';

import { AplicacionUpdateComponent } from './aplicacion-update.component';

describe('Component Tests', () => {
  describe('Aplicacion Management Update Component', () => {
    let comp: AplicacionUpdateComponent;
    let fixture: ComponentFixture<AplicacionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let aplicacionService: AplicacionService;
    let motorService: MotorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AplicacionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(AplicacionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AplicacionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      aplicacionService = TestBed.inject(AplicacionService);
      motorService = TestBed.inject(MotorService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Motor query and add missing value', () => {
        const aplicacion: IAplicacion = { id: 456 };
        const motor: IMotor = { id: 38823 };
        aplicacion.motor = motor;

        const motorCollection: IMotor[] = [{ id: 98743 }];
        jest.spyOn(motorService, 'query').mockReturnValue(of(new HttpResponse({ body: motorCollection })));
        const additionalMotors = [motor];
        const expectedCollection: IMotor[] = [...additionalMotors, ...motorCollection];
        jest.spyOn(motorService, 'addMotorToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ aplicacion });
        comp.ngOnInit();

        expect(motorService.query).toHaveBeenCalled();
        expect(motorService.addMotorToCollectionIfMissing).toHaveBeenCalledWith(motorCollection, ...additionalMotors);
        expect(comp.motorsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const aplicacion: IAplicacion = { id: 456 };
        const motor: IMotor = { id: 4222 };
        aplicacion.motor = motor;

        activatedRoute.data = of({ aplicacion });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(aplicacion));
        expect(comp.motorsSharedCollection).toContain(motor);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Aplicacion>>();
        const aplicacion = { id: 123 };
        jest.spyOn(aplicacionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ aplicacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: aplicacion }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(aplicacionService.update).toHaveBeenCalledWith(aplicacion);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Aplicacion>>();
        const aplicacion = new Aplicacion();
        jest.spyOn(aplicacionService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ aplicacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: aplicacion }));
        saveSubject.complete();

        // THEN
        expect(aplicacionService.create).toHaveBeenCalledWith(aplicacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Aplicacion>>();
        const aplicacion = { id: 123 };
        jest.spyOn(aplicacionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ aplicacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(aplicacionService.update).toHaveBeenCalledWith(aplicacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackMotorById', () => {
        it('Should return tracked Motor primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMotorById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
