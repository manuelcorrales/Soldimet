jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DetalleMovimientoService } from '../service/detalle-movimiento.service';
import { IDetalleMovimiento, DetalleMovimiento } from '../detalle-movimiento.model';
import { ITipoDetalleMovimiento } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from 'app/entities/tipo-detalle-movimiento/service/tipo-detalle-movimiento.service';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';
import { IPedidoRepuesto } from 'app/entities/pedido-repuesto/pedido-repuesto.model';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto/service/pedido-repuesto.service';
import { IPresupuesto } from 'app/entities/presupuesto/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto/service/presupuesto.service';
import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';
import { MedidaArticuloService } from 'app/entities/medida-articulo/service/medida-articulo.service';

import { DetalleMovimientoUpdateComponent } from './detalle-movimiento-update.component';

describe('Component Tests', () => {
  describe('DetalleMovimiento Management Update Component', () => {
    let comp: DetalleMovimientoUpdateComponent;
    let fixture: ComponentFixture<DetalleMovimientoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let detalleMovimientoService: DetalleMovimientoService;
    let tipoDetalleMovimientoService: TipoDetalleMovimientoService;
    let articuloService: ArticuloService;
    let pedidoRepuestoService: PedidoRepuestoService;
    let presupuestoService: PresupuestoService;
    let medidaArticuloService: MedidaArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DetalleMovimientoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DetalleMovimientoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleMovimientoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      detalleMovimientoService = TestBed.inject(DetalleMovimientoService);
      tipoDetalleMovimientoService = TestBed.inject(TipoDetalleMovimientoService);
      articuloService = TestBed.inject(ArticuloService);
      pedidoRepuestoService = TestBed.inject(PedidoRepuestoService);
      presupuestoService = TestBed.inject(PresupuestoService);
      medidaArticuloService = TestBed.inject(MedidaArticuloService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call TipoDetalleMovimiento query and add missing value', () => {
        const detalleMovimiento: IDetalleMovimiento = { id: 456 };
        const tipoDetalleMovimiento: ITipoDetalleMovimiento = { id: 89804 };
        detalleMovimiento.tipoDetalleMovimiento = tipoDetalleMovimiento;

        const tipoDetalleMovimientoCollection: ITipoDetalleMovimiento[] = [{ id: 88517 }];
        jest.spyOn(tipoDetalleMovimientoService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoDetalleMovimientoCollection })));
        const additionalTipoDetalleMovimientos = [tipoDetalleMovimiento];
        const expectedCollection: ITipoDetalleMovimiento[] = [...additionalTipoDetalleMovimientos, ...tipoDetalleMovimientoCollection];
        jest.spyOn(tipoDetalleMovimientoService, 'addTipoDetalleMovimientoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ detalleMovimiento });
        comp.ngOnInit();

        expect(tipoDetalleMovimientoService.query).toHaveBeenCalled();
        expect(tipoDetalleMovimientoService.addTipoDetalleMovimientoToCollectionIfMissing).toHaveBeenCalledWith(
          tipoDetalleMovimientoCollection,
          ...additionalTipoDetalleMovimientos
        );
        expect(comp.tipoDetalleMovimientosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Articulo query and add missing value', () => {
        const detalleMovimiento: IDetalleMovimiento = { id: 456 };
        const articulo: IArticulo = { id: 19037 };
        detalleMovimiento.articulo = articulo;

        const articuloCollection: IArticulo[] = [{ id: 31337 }];
        jest.spyOn(articuloService, 'query').mockReturnValue(of(new HttpResponse({ body: articuloCollection })));
        const additionalArticulos = [articulo];
        const expectedCollection: IArticulo[] = [...additionalArticulos, ...articuloCollection];
        jest.spyOn(articuloService, 'addArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ detalleMovimiento });
        comp.ngOnInit();

        expect(articuloService.query).toHaveBeenCalled();
        expect(articuloService.addArticuloToCollectionIfMissing).toHaveBeenCalledWith(articuloCollection, ...additionalArticulos);
        expect(comp.articulosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call PedidoRepuesto query and add missing value', () => {
        const detalleMovimiento: IDetalleMovimiento = { id: 456 };
        const pedidoRepuesto: IPedidoRepuesto = { id: 45946 };
        detalleMovimiento.pedidoRepuesto = pedidoRepuesto;

        const pedidoRepuestoCollection: IPedidoRepuesto[] = [{ id: 45678 }];
        jest.spyOn(pedidoRepuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: pedidoRepuestoCollection })));
        const additionalPedidoRepuestos = [pedidoRepuesto];
        const expectedCollection: IPedidoRepuesto[] = [...additionalPedidoRepuestos, ...pedidoRepuestoCollection];
        jest.spyOn(pedidoRepuestoService, 'addPedidoRepuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ detalleMovimiento });
        comp.ngOnInit();

        expect(pedidoRepuestoService.query).toHaveBeenCalled();
        expect(pedidoRepuestoService.addPedidoRepuestoToCollectionIfMissing).toHaveBeenCalledWith(
          pedidoRepuestoCollection,
          ...additionalPedidoRepuestos
        );
        expect(comp.pedidoRepuestosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Presupuesto query and add missing value', () => {
        const detalleMovimiento: IDetalleMovimiento = { id: 456 };
        const presupuesto: IPresupuesto = { id: 41536 };
        detalleMovimiento.presupuesto = presupuesto;

        const presupuestoCollection: IPresupuesto[] = [{ id: 71871 }];
        jest.spyOn(presupuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: presupuestoCollection })));
        const additionalPresupuestos = [presupuesto];
        const expectedCollection: IPresupuesto[] = [...additionalPresupuestos, ...presupuestoCollection];
        jest.spyOn(presupuestoService, 'addPresupuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ detalleMovimiento });
        comp.ngOnInit();

        expect(presupuestoService.query).toHaveBeenCalled();
        expect(presupuestoService.addPresupuestoToCollectionIfMissing).toHaveBeenCalledWith(
          presupuestoCollection,
          ...additionalPresupuestos
        );
        expect(comp.presupuestosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call MedidaArticulo query and add missing value', () => {
        const detalleMovimiento: IDetalleMovimiento = { id: 456 };
        const medida: IMedidaArticulo = { id: 9324 };
        detalleMovimiento.medida = medida;

        const medidaArticuloCollection: IMedidaArticulo[] = [{ id: 27697 }];
        jest.spyOn(medidaArticuloService, 'query').mockReturnValue(of(new HttpResponse({ body: medidaArticuloCollection })));
        const additionalMedidaArticulos = [medida];
        const expectedCollection: IMedidaArticulo[] = [...additionalMedidaArticulos, ...medidaArticuloCollection];
        jest.spyOn(medidaArticuloService, 'addMedidaArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ detalleMovimiento });
        comp.ngOnInit();

        expect(medidaArticuloService.query).toHaveBeenCalled();
        expect(medidaArticuloService.addMedidaArticuloToCollectionIfMissing).toHaveBeenCalledWith(
          medidaArticuloCollection,
          ...additionalMedidaArticulos
        );
        expect(comp.medidaArticulosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const detalleMovimiento: IDetalleMovimiento = { id: 456 };
        const tipoDetalleMovimiento: ITipoDetalleMovimiento = { id: 23592 };
        detalleMovimiento.tipoDetalleMovimiento = tipoDetalleMovimiento;
        const articulo: IArticulo = { id: 18342 };
        detalleMovimiento.articulo = articulo;
        const pedidoRepuesto: IPedidoRepuesto = { id: 18598 };
        detalleMovimiento.pedidoRepuesto = pedidoRepuesto;
        const presupuesto: IPresupuesto = { id: 61160 };
        detalleMovimiento.presupuesto = presupuesto;
        const medida: IMedidaArticulo = { id: 16912 };
        detalleMovimiento.medida = medida;

        activatedRoute.data = of({ detalleMovimiento });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(detalleMovimiento));
        expect(comp.tipoDetalleMovimientosSharedCollection).toContain(tipoDetalleMovimiento);
        expect(comp.articulosSharedCollection).toContain(articulo);
        expect(comp.pedidoRepuestosSharedCollection).toContain(pedidoRepuesto);
        expect(comp.presupuestosSharedCollection).toContain(presupuesto);
        expect(comp.medidaArticulosSharedCollection).toContain(medida);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DetalleMovimiento>>();
        const detalleMovimiento = { id: 123 };
        jest.spyOn(detalleMovimientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ detalleMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: detalleMovimiento }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(detalleMovimientoService.update).toHaveBeenCalledWith(detalleMovimiento);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DetalleMovimiento>>();
        const detalleMovimiento = new DetalleMovimiento();
        jest.spyOn(detalleMovimientoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ detalleMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: detalleMovimiento }));
        saveSubject.complete();

        // THEN
        expect(detalleMovimientoService.create).toHaveBeenCalledWith(detalleMovimiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DetalleMovimiento>>();
        const detalleMovimiento = { id: 123 };
        jest.spyOn(detalleMovimientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ detalleMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(detalleMovimientoService.update).toHaveBeenCalledWith(detalleMovimiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackTipoDetalleMovimientoById', () => {
        it('Should return tracked TipoDetalleMovimiento primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTipoDetalleMovimientoById(0, entity);
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

      describe('trackPedidoRepuestoById', () => {
        it('Should return tracked PedidoRepuesto primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackPedidoRepuestoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackPresupuestoById', () => {
        it('Should return tracked Presupuesto primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackPresupuestoById(0, entity);
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
