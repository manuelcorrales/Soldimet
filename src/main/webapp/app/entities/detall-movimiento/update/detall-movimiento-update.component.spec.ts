jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DetallMovimientoService } from '../service/detall-movimiento.service';
import { IDetallMovimiento, DetallMovimiento } from '../detall-movimiento.model';
import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';
import { MedidaArticuloService } from 'app/entities/medida-articulo/service/medida-articulo.service';

import { DetallMovimientoUpdateComponent } from './detall-movimiento-update.component';

describe('Component Tests', () => {
  describe('DetallMovimiento Management Update Component', () => {
    let comp: DetallMovimientoUpdateComponent;
    let fixture: ComponentFixture<DetallMovimientoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let detallMovimientoService: DetallMovimientoService;
    let medidaArticuloService: MedidaArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DetallMovimientoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DetallMovimientoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetallMovimientoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      detallMovimientoService = TestBed.inject(DetallMovimientoService);
      medidaArticuloService = TestBed.inject(MedidaArticuloService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call MedidaArticulo query and add missing value', () => {
        const detallMovimiento: IDetallMovimiento = { id: 456 };
        const medida: IMedidaArticulo = { id: 12039 };
        detallMovimiento.medida = medida;

        const medidaArticuloCollection: IMedidaArticulo[] = [{ id: 73304 }];
        jest.spyOn(medidaArticuloService, 'query').mockReturnValue(of(new HttpResponse({ body: medidaArticuloCollection })));
        const additionalMedidaArticulos = [medida];
        const expectedCollection: IMedidaArticulo[] = [...additionalMedidaArticulos, ...medidaArticuloCollection];
        jest.spyOn(medidaArticuloService, 'addMedidaArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ detallMovimiento });
        comp.ngOnInit();

        expect(medidaArticuloService.query).toHaveBeenCalled();
        expect(medidaArticuloService.addMedidaArticuloToCollectionIfMissing).toHaveBeenCalledWith(
          medidaArticuloCollection,
          ...additionalMedidaArticulos
        );
        expect(comp.medidaArticulosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const detallMovimiento: IDetallMovimiento = { id: 456 };
        const medida: IMedidaArticulo = { id: 43413 };
        detallMovimiento.medida = medida;

        activatedRoute.data = of({ detallMovimiento });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(detallMovimiento));
        expect(comp.medidaArticulosSharedCollection).toContain(medida);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DetallMovimiento>>();
        const detallMovimiento = { id: 123 };
        jest.spyOn(detallMovimientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ detallMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: detallMovimiento }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(detallMovimientoService.update).toHaveBeenCalledWith(detallMovimiento);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DetallMovimiento>>();
        const detallMovimiento = new DetallMovimiento();
        jest.spyOn(detallMovimientoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ detallMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: detallMovimiento }));
        saveSubject.complete();

        // THEN
        expect(detallMovimientoService.create).toHaveBeenCalledWith(detallMovimiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DetallMovimiento>>();
        const detallMovimiento = { id: 123 };
        jest.spyOn(detallMovimientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ detallMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(detallMovimientoService.update).toHaveBeenCalledWith(detallMovimiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackMedidaArticuloById', () => {
        it('Should return tracked MedidaArticulo primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMedidaArticuloById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
