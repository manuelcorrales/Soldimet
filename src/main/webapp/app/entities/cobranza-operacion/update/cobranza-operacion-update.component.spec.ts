jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CobranzaOperacionService } from '../service/cobranza-operacion.service';
import { ICobranzaOperacion, CobranzaOperacion } from '../cobranza-operacion.model';
import { IEstadoCobranzaOperacion } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from 'app/entities/estado-cobranza-operacion/service/estado-cobranza-operacion.service';
import { IOperacion } from 'app/entities/operacion/operacion.model';
import { OperacionService } from 'app/entities/operacion/service/operacion.service';

import { CobranzaOperacionUpdateComponent } from './cobranza-operacion-update.component';

describe('Component Tests', () => {
  describe('CobranzaOperacion Management Update Component', () => {
    let comp: CobranzaOperacionUpdateComponent;
    let fixture: ComponentFixture<CobranzaOperacionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cobranzaOperacionService: CobranzaOperacionService;
    let estadoCobranzaOperacionService: EstadoCobranzaOperacionService;
    let operacionService: OperacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CobranzaOperacionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CobranzaOperacionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CobranzaOperacionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cobranzaOperacionService = TestBed.inject(CobranzaOperacionService);
      estadoCobranzaOperacionService = TestBed.inject(EstadoCobranzaOperacionService);
      operacionService = TestBed.inject(OperacionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call EstadoCobranzaOperacion query and add missing value', () => {
        const cobranzaOperacion: ICobranzaOperacion = { id: 456 };
        const estadoCobranzaOperacion: IEstadoCobranzaOperacion = { id: 34034 };
        cobranzaOperacion.estadoCobranzaOperacion = estadoCobranzaOperacion;

        const estadoCobranzaOperacionCollection: IEstadoCobranzaOperacion[] = [{ id: 13049 }];
        jest
          .spyOn(estadoCobranzaOperacionService, 'query')
          .mockReturnValue(of(new HttpResponse({ body: estadoCobranzaOperacionCollection })));
        const additionalEstadoCobranzaOperacions = [estadoCobranzaOperacion];
        const expectedCollection: IEstadoCobranzaOperacion[] = [
          ...additionalEstadoCobranzaOperacions,
          ...estadoCobranzaOperacionCollection,
        ];
        jest.spyOn(estadoCobranzaOperacionService, 'addEstadoCobranzaOperacionToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ cobranzaOperacion });
        comp.ngOnInit();

        expect(estadoCobranzaOperacionService.query).toHaveBeenCalled();
        expect(estadoCobranzaOperacionService.addEstadoCobranzaOperacionToCollectionIfMissing).toHaveBeenCalledWith(
          estadoCobranzaOperacionCollection,
          ...additionalEstadoCobranzaOperacions
        );
        expect(comp.estadoCobranzaOperacionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Operacion query and add missing value', () => {
        const cobranzaOperacion: ICobranzaOperacion = { id: 456 };
        const operacion: IOperacion = { id: 60583 };
        cobranzaOperacion.operacion = operacion;

        const operacionCollection: IOperacion[] = [{ id: 77360 }];
        jest.spyOn(operacionService, 'query').mockReturnValue(of(new HttpResponse({ body: operacionCollection })));
        const additionalOperacions = [operacion];
        const expectedCollection: IOperacion[] = [...additionalOperacions, ...operacionCollection];
        jest.spyOn(operacionService, 'addOperacionToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ cobranzaOperacion });
        comp.ngOnInit();

        expect(operacionService.query).toHaveBeenCalled();
        expect(operacionService.addOperacionToCollectionIfMissing).toHaveBeenCalledWith(operacionCollection, ...additionalOperacions);
        expect(comp.operacionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const cobranzaOperacion: ICobranzaOperacion = { id: 456 };
        const estadoCobranzaOperacion: IEstadoCobranzaOperacion = { id: 5370 };
        cobranzaOperacion.estadoCobranzaOperacion = estadoCobranzaOperacion;
        const operacion: IOperacion = { id: 64733 };
        cobranzaOperacion.operacion = operacion;

        activatedRoute.data = of({ cobranzaOperacion });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cobranzaOperacion));
        expect(comp.estadoCobranzaOperacionsSharedCollection).toContain(estadoCobranzaOperacion);
        expect(comp.operacionsSharedCollection).toContain(operacion);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CobranzaOperacion>>();
        const cobranzaOperacion = { id: 123 };
        jest.spyOn(cobranzaOperacionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cobranzaOperacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cobranzaOperacion }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cobranzaOperacionService.update).toHaveBeenCalledWith(cobranzaOperacion);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CobranzaOperacion>>();
        const cobranzaOperacion = new CobranzaOperacion();
        jest.spyOn(cobranzaOperacionService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cobranzaOperacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cobranzaOperacion }));
        saveSubject.complete();

        // THEN
        expect(cobranzaOperacionService.create).toHaveBeenCalledWith(cobranzaOperacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CobranzaOperacion>>();
        const cobranzaOperacion = { id: 123 };
        jest.spyOn(cobranzaOperacionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cobranzaOperacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cobranzaOperacionService.update).toHaveBeenCalledWith(cobranzaOperacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackEstadoCobranzaOperacionById', () => {
        it('Should return tracked EstadoCobranzaOperacion primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEstadoCobranzaOperacionById(0, entity);
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
    });
  });
});
