jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MotorService } from '../service/motor.service';
import { IMotor, Motor } from '../motor.model';

import { MotorUpdateComponent } from './motor-update.component';

describe('Component Tests', () => {
  describe('Motor Management Update Component', () => {
    let comp: MotorUpdateComponent;
    let fixture: ComponentFixture<MotorUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let motorService: MotorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MotorUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MotorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MotorUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      motorService = TestBed.inject(MotorService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const motor: IMotor = { id: 456 };

        activatedRoute.data = of({ motor });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(motor));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Motor>>();
        const motor = { id: 123 };
        jest.spyOn(motorService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ motor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: motor }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(motorService.update).toHaveBeenCalledWith(motor);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Motor>>();
        const motor = new Motor();
        jest.spyOn(motorService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ motor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: motor }));
        saveSubject.complete();

        // THEN
        expect(motorService.create).toHaveBeenCalledWith(motor);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Motor>>();
        const motor = { id: 123 };
        jest.spyOn(motorService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ motor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(motorService.update).toHaveBeenCalledWith(motor);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
