jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { HistorialPrecioService } from '../service/historial-precio.service';
import { IHistorialPrecio, HistorialPrecio } from '../historial-precio.model';
import { IPrecioRepuesto } from 'app/entities/precio-repuesto/precio-repuesto.model';
import { PrecioRepuestoService } from 'app/entities/precio-repuesto/service/precio-repuesto.service';

import { HistorialPrecioUpdateComponent } from './historial-precio-update.component';

describe('Component Tests', () => {
  describe('HistorialPrecio Management Update Component', () => {
    let comp: HistorialPrecioUpdateComponent;
    let fixture: ComponentFixture<HistorialPrecioUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let historialPrecioService: HistorialPrecioService;
    let precioRepuestoService: PrecioRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [HistorialPrecioUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(HistorialPrecioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistorialPrecioUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      historialPrecioService = TestBed.inject(HistorialPrecioService);
      precioRepuestoService = TestBed.inject(PrecioRepuestoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call precioRepuesto query and add missing value', () => {
        const historialPrecio: IHistorialPrecio = { id: 456 };
        const precioRepuesto: IPrecioRepuesto = { id: 89865 };
        historialPrecio.precioRepuesto = precioRepuesto;

        const precioRepuestoCollection: IPrecioRepuesto[] = [{ id: 42833 }];
        jest.spyOn(precioRepuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: precioRepuestoCollection })));
        const expectedCollection: IPrecioRepuesto[] = [precioRepuesto, ...precioRepuestoCollection];
        jest.spyOn(precioRepuestoService, 'addPrecioRepuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ historialPrecio });
        comp.ngOnInit();

        expect(precioRepuestoService.query).toHaveBeenCalled();
        expect(precioRepuestoService.addPrecioRepuestoToCollectionIfMissing).toHaveBeenCalledWith(precioRepuestoCollection, precioRepuesto);
        expect(comp.precioRepuestosCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const historialPrecio: IHistorialPrecio = { id: 456 };
        const precioRepuesto: IPrecioRepuesto = { id: 14295 };
        historialPrecio.precioRepuesto = precioRepuesto;

        activatedRoute.data = of({ historialPrecio });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(historialPrecio));
        expect(comp.precioRepuestosCollection).toContain(precioRepuesto);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<HistorialPrecio>>();
        const historialPrecio = { id: 123 };
        jest.spyOn(historialPrecioService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ historialPrecio });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: historialPrecio }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(historialPrecioService.update).toHaveBeenCalledWith(historialPrecio);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<HistorialPrecio>>();
        const historialPrecio = new HistorialPrecio();
        jest.spyOn(historialPrecioService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ historialPrecio });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: historialPrecio }));
        saveSubject.complete();

        // THEN
        expect(historialPrecioService.create).toHaveBeenCalledWith(historialPrecio);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<HistorialPrecio>>();
        const historialPrecio = { id: 123 };
        jest.spyOn(historialPrecioService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ historialPrecio });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(historialPrecioService.update).toHaveBeenCalledWith(historialPrecio);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackPrecioRepuestoById', () => {
        it('Should return tracked PrecioRepuesto primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackPrecioRepuestoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
