jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { StockArticuloService } from '../service/stock-articulo.service';
import { IStockArticulo, StockArticulo } from '../stock-articulo.model';
import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';
import { MedidaArticuloService } from 'app/entities/medida-articulo/service/medida-articulo.service';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/service/sucursal.service';

import { StockArticuloUpdateComponent } from './stock-articulo-update.component';

describe('Component Tests', () => {
  describe('StockArticulo Management Update Component', () => {
    let comp: StockArticuloUpdateComponent;
    let fixture: ComponentFixture<StockArticuloUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let stockArticuloService: StockArticuloService;
    let medidaArticuloService: MedidaArticuloService;
    let articuloService: ArticuloService;
    let sucursalService: SucursalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [StockArticuloUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(StockArticuloUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StockArticuloUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      stockArticuloService = TestBed.inject(StockArticuloService);
      medidaArticuloService = TestBed.inject(MedidaArticuloService);
      articuloService = TestBed.inject(ArticuloService);
      sucursalService = TestBed.inject(SucursalService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call MedidaArticulo query and add missing value', () => {
        const stockArticulo: IStockArticulo = { id: 456 };
        const medida: IMedidaArticulo = { id: 10069 };
        stockArticulo.medida = medida;

        const medidaArticuloCollection: IMedidaArticulo[] = [{ id: 20268 }];
        jest.spyOn(medidaArticuloService, 'query').mockReturnValue(of(new HttpResponse({ body: medidaArticuloCollection })));
        const additionalMedidaArticulos = [medida];
        const expectedCollection: IMedidaArticulo[] = [...additionalMedidaArticulos, ...medidaArticuloCollection];
        jest.spyOn(medidaArticuloService, 'addMedidaArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ stockArticulo });
        comp.ngOnInit();

        expect(medidaArticuloService.query).toHaveBeenCalled();
        expect(medidaArticuloService.addMedidaArticuloToCollectionIfMissing).toHaveBeenCalledWith(
          medidaArticuloCollection,
          ...additionalMedidaArticulos
        );
        expect(comp.medidaArticulosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Articulo query and add missing value', () => {
        const stockArticulo: IStockArticulo = { id: 456 };
        const articulo: IArticulo = { id: 73975 };
        stockArticulo.articulo = articulo;

        const articuloCollection: IArticulo[] = [{ id: 46933 }];
        jest.spyOn(articuloService, 'query').mockReturnValue(of(new HttpResponse({ body: articuloCollection })));
        const additionalArticulos = [articulo];
        const expectedCollection: IArticulo[] = [...additionalArticulos, ...articuloCollection];
        jest.spyOn(articuloService, 'addArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ stockArticulo });
        comp.ngOnInit();

        expect(articuloService.query).toHaveBeenCalled();
        expect(articuloService.addArticuloToCollectionIfMissing).toHaveBeenCalledWith(articuloCollection, ...additionalArticulos);
        expect(comp.articulosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Sucursal query and add missing value', () => {
        const stockArticulo: IStockArticulo = { id: 456 };
        const sucursal: ISucursal = { id: 67290 };
        stockArticulo.sucursal = sucursal;

        const sucursalCollection: ISucursal[] = [{ id: 65646 }];
        jest.spyOn(sucursalService, 'query').mockReturnValue(of(new HttpResponse({ body: sucursalCollection })));
        const additionalSucursals = [sucursal];
        const expectedCollection: ISucursal[] = [...additionalSucursals, ...sucursalCollection];
        jest.spyOn(sucursalService, 'addSucursalToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ stockArticulo });
        comp.ngOnInit();

        expect(sucursalService.query).toHaveBeenCalled();
        expect(sucursalService.addSucursalToCollectionIfMissing).toHaveBeenCalledWith(sucursalCollection, ...additionalSucursals);
        expect(comp.sucursalsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const stockArticulo: IStockArticulo = { id: 456 };
        const medida: IMedidaArticulo = { id: 6978 };
        stockArticulo.medida = medida;
        const articulo: IArticulo = { id: 78254 };
        stockArticulo.articulo = articulo;
        const sucursal: ISucursal = { id: 70287 };
        stockArticulo.sucursal = sucursal;

        activatedRoute.data = of({ stockArticulo });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(stockArticulo));
        expect(comp.medidaArticulosSharedCollection).toContain(medida);
        expect(comp.articulosSharedCollection).toContain(articulo);
        expect(comp.sucursalsSharedCollection).toContain(sucursal);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<StockArticulo>>();
        const stockArticulo = { id: 123 };
        jest.spyOn(stockArticuloService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ stockArticulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: stockArticulo }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(stockArticuloService.update).toHaveBeenCalledWith(stockArticulo);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<StockArticulo>>();
        const stockArticulo = new StockArticulo();
        jest.spyOn(stockArticuloService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ stockArticulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: stockArticulo }));
        saveSubject.complete();

        // THEN
        expect(stockArticuloService.create).toHaveBeenCalledWith(stockArticulo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<StockArticulo>>();
        const stockArticulo = { id: 123 };
        jest.spyOn(stockArticuloService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ stockArticulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(stockArticuloService.update).toHaveBeenCalledWith(stockArticulo);
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

      describe('trackArticuloById', () => {
        it('Should return tracked Articulo primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackArticuloById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackSucursalById', () => {
        it('Should return tracked Sucursal primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackSucursalById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
