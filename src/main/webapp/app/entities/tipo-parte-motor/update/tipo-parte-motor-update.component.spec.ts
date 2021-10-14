jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TipoParteMotorService } from '../service/tipo-parte-motor.service';
import { ITipoParteMotor, TipoParteMotor } from '../tipo-parte-motor.model';

import { TipoParteMotorUpdateComponent } from './tipo-parte-motor-update.component';

describe('Component Tests', () => {
  describe('TipoParteMotor Management Update Component', () => {
    let comp: TipoParteMotorUpdateComponent;
    let fixture: ComponentFixture<TipoParteMotorUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let tipoParteMotorService: TipoParteMotorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TipoParteMotorUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TipoParteMotorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoParteMotorUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      tipoParteMotorService = TestBed.inject(TipoParteMotorService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const tipoParteMotor: ITipoParteMotor = { id: 456 };

        activatedRoute.data = of({ tipoParteMotor });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(tipoParteMotor));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TipoParteMotor>>();
        const tipoParteMotor = { id: 123 };
        jest.spyOn(tipoParteMotorService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoParteMotor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: tipoParteMotor }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(tipoParteMotorService.update).toHaveBeenCalledWith(tipoParteMotor);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TipoParteMotor>>();
        const tipoParteMotor = new TipoParteMotor();
        jest.spyOn(tipoParteMotorService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoParteMotor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: tipoParteMotor }));
        saveSubject.complete();

        // THEN
        expect(tipoParteMotorService.create).toHaveBeenCalledWith(tipoParteMotor);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TipoParteMotor>>();
        const tipoParteMotor = { id: 123 };
        jest.spyOn(tipoParteMotorService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoParteMotor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(tipoParteMotorService.update).toHaveBeenCalledWith(tipoParteMotor);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
