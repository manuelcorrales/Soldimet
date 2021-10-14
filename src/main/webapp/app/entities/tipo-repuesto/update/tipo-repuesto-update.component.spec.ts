jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TipoRepuestoService } from '../service/tipo-repuesto.service';
import { ITipoRepuesto, TipoRepuesto } from '../tipo-repuesto.model';
import { ITipoParteMotor } from 'app/entities/tipo-parte-motor/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/service/tipo-parte-motor.service';

import { TipoRepuestoUpdateComponent } from './tipo-repuesto-update.component';

describe('Component Tests', () => {
  describe('TipoRepuesto Management Update Component', () => {
    let comp: TipoRepuestoUpdateComponent;
    let fixture: ComponentFixture<TipoRepuestoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let tipoRepuestoService: TipoRepuestoService;
    let tipoParteMotorService: TipoParteMotorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TipoRepuestoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TipoRepuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoRepuestoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      tipoRepuestoService = TestBed.inject(TipoRepuestoService);
      tipoParteMotorService = TestBed.inject(TipoParteMotorService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call TipoParteMotor query and add missing value', () => {
        const tipoRepuesto: ITipoRepuesto = { id: 456 };
        const tipoParteMotor: ITipoParteMotor = { id: 31626 };
        tipoRepuesto.tipoParteMotor = tipoParteMotor;

        const tipoParteMotorCollection: ITipoParteMotor[] = [{ id: 36421 }];
        jest.spyOn(tipoParteMotorService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoParteMotorCollection })));
        const additionalTipoParteMotors = [tipoParteMotor];
        const expectedCollection: ITipoParteMotor[] = [...additionalTipoParteMotors, ...tipoParteMotorCollection];
        jest.spyOn(tipoParteMotorService, 'addTipoParteMotorToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ tipoRepuesto });
        comp.ngOnInit();

        expect(tipoParteMotorService.query).toHaveBeenCalled();
        expect(tipoParteMotorService.addTipoParteMotorToCollectionIfMissing).toHaveBeenCalledWith(
          tipoParteMotorCollection,
          ...additionalTipoParteMotors
        );
        expect(comp.tipoParteMotorsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const tipoRepuesto: ITipoRepuesto = { id: 456 };
        const tipoParteMotor: ITipoParteMotor = { id: 1052 };
        tipoRepuesto.tipoParteMotor = tipoParteMotor;

        activatedRoute.data = of({ tipoRepuesto });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(tipoRepuesto));
        expect(comp.tipoParteMotorsSharedCollection).toContain(tipoParteMotor);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TipoRepuesto>>();
        const tipoRepuesto = { id: 123 };
        jest.spyOn(tipoRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: tipoRepuesto }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(tipoRepuestoService.update).toHaveBeenCalledWith(tipoRepuesto);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TipoRepuesto>>();
        const tipoRepuesto = new TipoRepuesto();
        jest.spyOn(tipoRepuestoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: tipoRepuesto }));
        saveSubject.complete();

        // THEN
        expect(tipoRepuestoService.create).toHaveBeenCalledWith(tipoRepuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TipoRepuesto>>();
        const tipoRepuesto = { id: 123 };
        jest.spyOn(tipoRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(tipoRepuestoService.update).toHaveBeenCalledWith(tipoRepuesto);
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
    });
  });
});
