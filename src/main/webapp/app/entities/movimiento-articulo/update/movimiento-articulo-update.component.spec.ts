jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MovimientoArticuloService } from '../service/movimiento-articulo.service';
import { IMovimientoArticulo, MovimientoArticulo } from '../movimiento-articulo.model';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';
import { IMovimiento } from 'app/entities/movimiento/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento/service/movimiento.service';
import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';
import { MedidaArticuloService } from 'app/entities/medida-articulo/service/medida-articulo.service';

import { MovimientoArticuloUpdateComponent } from './movimiento-articulo-update.component';

describe('Component Tests', () => {
  describe('MovimientoArticulo Management Update Component', () => {
    let comp: MovimientoArticuloUpdateComponent;
    let fixture: ComponentFixture<MovimientoArticuloUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let movimientoArticuloService: MovimientoArticuloService;
    let articuloService: ArticuloService;
    let movimientoService: MovimientoService;
    let medidaArticuloService: MedidaArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MovimientoArticuloUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MovimientoArticuloUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoArticuloUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      movimientoArticuloService = TestBed.inject(MovimientoArticuloService);
      articuloService = TestBed.inject(ArticuloService);
      movimientoService = TestBed.inject(MovimientoService);
      medidaArticuloService = TestBed.inject(MedidaArticuloService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Articulo query and add missing value', () => {
        const movimientoArticulo: IMovimientoArticulo = { id: 456 };
        const articulo: IArticulo = { id: 19652 };
        movimientoArticulo.articulo = articulo;

        const articuloCollection: IArticulo[] = [{ id: 29513 }];
        jest.spyOn(articuloService, 'query').mockReturnValue(of(new HttpResponse({ body: articuloCollection })));
        const additionalArticulos = [articulo];
        const expectedCollection: IArticulo[] = [...additionalArticulos, ...articuloCollection];
        jest.spyOn(articuloService, 'addArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ movimientoArticulo });
        comp.ngOnInit();

        expect(articuloService.query).toHaveBeenCalled();
        expect(articuloService.addArticuloToCollectionIfMissing).toHaveBeenCalledWith(articuloCollection, ...additionalArticulos);
        expect(comp.articulosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Movimiento query and add missing value', () => {
        const movimientoArticulo: IMovimientoArticulo = { id: 456 };
        const movimiento: IMovimiento = { id: 95855 };
        movimientoArticulo.movimiento = movimiento;

        const movimientoCollection: IMovimiento[] = [{ id: 96513 }];
        jest.spyOn(movimientoService, 'query').mockReturnValue(of(new HttpResponse({ body: movimientoCollection })));
        const additionalMovimientos = [movimiento];
        const expectedCollection: IMovimiento[] = [...additionalMovimientos, ...movimientoCollection];
        jest.spyOn(movimientoService, 'addMovimientoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ movimientoArticulo });
        comp.ngOnInit();

        expect(movimientoService.query).toHaveBeenCalled();
        expect(movimientoService.addMovimientoToCollectionIfMissing).toHaveBeenCalledWith(movimientoCollection, ...additionalMovimientos);
        expect(comp.movimientosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call MedidaArticulo query and add missing value', () => {
        const movimientoArticulo: IMovimientoArticulo = { id: 456 };
        const medida: IMedidaArticulo = { id: 11531 };
        movimientoArticulo.medida = medida;

        const medidaArticuloCollection: IMedidaArticulo[] = [{ id: 2572 }];
        jest.spyOn(medidaArticuloService, 'query').mockReturnValue(of(new HttpResponse({ body: medidaArticuloCollection })));
        const additionalMedidaArticulos = [medida];
        const expectedCollection: IMedidaArticulo[] = [...additionalMedidaArticulos, ...medidaArticuloCollection];
        jest.spyOn(medidaArticuloService, 'addMedidaArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ movimientoArticulo });
        comp.ngOnInit();

        expect(medidaArticuloService.query).toHaveBeenCalled();
        expect(medidaArticuloService.addMedidaArticuloToCollectionIfMissing).toHaveBeenCalledWith(
          medidaArticuloCollection,
          ...additionalMedidaArticulos
        );
        expect(comp.medidaArticulosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const movimientoArticulo: IMovimientoArticulo = { id: 456 };
        const articulo: IArticulo = { id: 41075 };
        movimientoArticulo.articulo = articulo;
        const movimiento: IMovimiento = { id: 87222 };
        movimientoArticulo.movimiento = movimiento;
        const medida: IMedidaArticulo = { id: 70947 };
        movimientoArticulo.medida = medida;

        activatedRoute.data = of({ movimientoArticulo });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(movimientoArticulo));
        expect(comp.articulosSharedCollection).toContain(articulo);
        expect(comp.movimientosSharedCollection).toContain(movimiento);
        expect(comp.medidaArticulosSharedCollection).toContain(medida);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MovimientoArticulo>>();
        const movimientoArticulo = { id: 123 };
        jest.spyOn(movimientoArticuloService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ movimientoArticulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: movimientoArticulo }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(movimientoArticuloService.update).toHaveBeenCalledWith(movimientoArticulo);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MovimientoArticulo>>();
        const movimientoArticulo = new MovimientoArticulo();
        jest.spyOn(movimientoArticuloService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ movimientoArticulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: movimientoArticulo }));
        saveSubject.complete();

        // THEN
        expect(movimientoArticuloService.create).toHaveBeenCalledWith(movimientoArticulo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MovimientoArticulo>>();
        const movimientoArticulo = { id: 123 };
        jest.spyOn(movimientoArticuloService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ movimientoArticulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(movimientoArticuloService.update).toHaveBeenCalledWith(movimientoArticulo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackArticuloById', () => {
        it('Should return tracked Articulo primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackArticuloById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackMovimientoById', () => {
        it('Should return tracked Movimiento primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMovimientoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

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
