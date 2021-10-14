jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MovimientoService } from '../service/movimiento.service';
import { IMovimiento, Movimiento } from '../movimiento.model';
import { IMedioDePago } from 'app/entities/medio-de-pago/medio-de-pago.model';
import { MedioDePagoService } from 'app/entities/medio-de-pago/service/medio-de-pago.service';
import { IEstadoMovimiento } from 'app/entities/estado-movimiento/estado-movimiento.model';
import { EstadoMovimientoService } from 'app/entities/estado-movimiento/service/estado-movimiento.service';
import { ITipoMovimiento } from 'app/entities/tipo-movimiento/tipo-movimiento.model';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento/service/tipo-movimiento.service';
import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { EmpleadoService } from 'app/entities/empleado/service/empleado.service';
import { ICaja } from 'app/entities/caja/caja.model';
import { CajaService } from 'app/entities/caja/service/caja.service';
import { ISubCategoria } from 'app/entities/sub-categoria/sub-categoria.model';
import { SubCategoriaService } from 'app/entities/sub-categoria/service/sub-categoria.service';

import { MovimientoUpdateComponent } from './movimiento-update.component';

describe('Component Tests', () => {
  describe('Movimiento Management Update Component', () => {
    let comp: MovimientoUpdateComponent;
    let fixture: ComponentFixture<MovimientoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let movimientoService: MovimientoService;
    let medioDePagoService: MedioDePagoService;
    let estadoMovimientoService: EstadoMovimientoService;
    let tipoMovimientoService: TipoMovimientoService;
    let empleadoService: EmpleadoService;
    let cajaService: CajaService;
    let subCategoriaService: SubCategoriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MovimientoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MovimientoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      movimientoService = TestBed.inject(MovimientoService);
      medioDePagoService = TestBed.inject(MedioDePagoService);
      estadoMovimientoService = TestBed.inject(EstadoMovimientoService);
      tipoMovimientoService = TestBed.inject(TipoMovimientoService);
      empleadoService = TestBed.inject(EmpleadoService);
      cajaService = TestBed.inject(CajaService);
      subCategoriaService = TestBed.inject(SubCategoriaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call medioDePago query and add missing value', () => {
        const movimiento: IMovimiento = { id: 456 };
        const medioDePago: IMedioDePago = { id: 2990 };
        movimiento.medioDePago = medioDePago;

        const medioDePagoCollection: IMedioDePago[] = [{ id: 81536 }];
        jest.spyOn(medioDePagoService, 'query').mockReturnValue(of(new HttpResponse({ body: medioDePagoCollection })));
        const expectedCollection: IMedioDePago[] = [medioDePago, ...medioDePagoCollection];
        jest.spyOn(medioDePagoService, 'addMedioDePagoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ movimiento });
        comp.ngOnInit();

        expect(medioDePagoService.query).toHaveBeenCalled();
        expect(medioDePagoService.addMedioDePagoToCollectionIfMissing).toHaveBeenCalledWith(medioDePagoCollection, medioDePago);
        expect(comp.medioDePagosCollection).toEqual(expectedCollection);
      });

      it('Should call EstadoMovimiento query and add missing value', () => {
        const movimiento: IMovimiento = { id: 456 };
        const estado: IEstadoMovimiento = { id: 13323 };
        movimiento.estado = estado;

        const estadoMovimientoCollection: IEstadoMovimiento[] = [{ id: 67764 }];
        jest.spyOn(estadoMovimientoService, 'query').mockReturnValue(of(new HttpResponse({ body: estadoMovimientoCollection })));
        const additionalEstadoMovimientos = [estado];
        const expectedCollection: IEstadoMovimiento[] = [...additionalEstadoMovimientos, ...estadoMovimientoCollection];
        jest.spyOn(estadoMovimientoService, 'addEstadoMovimientoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ movimiento });
        comp.ngOnInit();

        expect(estadoMovimientoService.query).toHaveBeenCalled();
        expect(estadoMovimientoService.addEstadoMovimientoToCollectionIfMissing).toHaveBeenCalledWith(
          estadoMovimientoCollection,
          ...additionalEstadoMovimientos
        );
        expect(comp.estadoMovimientosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call TipoMovimiento query and add missing value', () => {
        const movimiento: IMovimiento = { id: 456 };
        const tipoMovimiento: ITipoMovimiento = { id: 70941 };
        movimiento.tipoMovimiento = tipoMovimiento;

        const tipoMovimientoCollection: ITipoMovimiento[] = [{ id: 77833 }];
        jest.spyOn(tipoMovimientoService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoMovimientoCollection })));
        const additionalTipoMovimientos = [tipoMovimiento];
        const expectedCollection: ITipoMovimiento[] = [...additionalTipoMovimientos, ...tipoMovimientoCollection];
        jest.spyOn(tipoMovimientoService, 'addTipoMovimientoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ movimiento });
        comp.ngOnInit();

        expect(tipoMovimientoService.query).toHaveBeenCalled();
        expect(tipoMovimientoService.addTipoMovimientoToCollectionIfMissing).toHaveBeenCalledWith(
          tipoMovimientoCollection,
          ...additionalTipoMovimientos
        );
        expect(comp.tipoMovimientosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Empleado query and add missing value', () => {
        const movimiento: IMovimiento = { id: 456 };
        const empleado: IEmpleado = { id: 35052 };
        movimiento.empleado = empleado;

        const empleadoCollection: IEmpleado[] = [{ id: 25314 }];
        jest.spyOn(empleadoService, 'query').mockReturnValue(of(new HttpResponse({ body: empleadoCollection })));
        const additionalEmpleados = [empleado];
        const expectedCollection: IEmpleado[] = [...additionalEmpleados, ...empleadoCollection];
        jest.spyOn(empleadoService, 'addEmpleadoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ movimiento });
        comp.ngOnInit();

        expect(empleadoService.query).toHaveBeenCalled();
        expect(empleadoService.addEmpleadoToCollectionIfMissing).toHaveBeenCalledWith(empleadoCollection, ...additionalEmpleados);
        expect(comp.empleadosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Caja query and add missing value', () => {
        const movimiento: IMovimiento = { id: 456 };
        const caja: ICaja = { id: 48820 };
        movimiento.caja = caja;

        const cajaCollection: ICaja[] = [{ id: 44578 }];
        jest.spyOn(cajaService, 'query').mockReturnValue(of(new HttpResponse({ body: cajaCollection })));
        const additionalCajas = [caja];
        const expectedCollection: ICaja[] = [...additionalCajas, ...cajaCollection];
        jest.spyOn(cajaService, 'addCajaToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ movimiento });
        comp.ngOnInit();

        expect(cajaService.query).toHaveBeenCalled();
        expect(cajaService.addCajaToCollectionIfMissing).toHaveBeenCalledWith(cajaCollection, ...additionalCajas);
        expect(comp.cajasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call SubCategoria query and add missing value', () => {
        const movimiento: IMovimiento = { id: 456 };
        const subCategoria: ISubCategoria = { id: 55247 };
        movimiento.subCategoria = subCategoria;

        const subCategoriaCollection: ISubCategoria[] = [{ id: 85219 }];
        jest.spyOn(subCategoriaService, 'query').mockReturnValue(of(new HttpResponse({ body: subCategoriaCollection })));
        const additionalSubCategorias = [subCategoria];
        const expectedCollection: ISubCategoria[] = [...additionalSubCategorias, ...subCategoriaCollection];
        jest.spyOn(subCategoriaService, 'addSubCategoriaToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ movimiento });
        comp.ngOnInit();

        expect(subCategoriaService.query).toHaveBeenCalled();
        expect(subCategoriaService.addSubCategoriaToCollectionIfMissing).toHaveBeenCalledWith(
          subCategoriaCollection,
          ...additionalSubCategorias
        );
        expect(comp.subCategoriasSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const movimiento: IMovimiento = { id: 456 };
        const medioDePago: IMedioDePago = { id: 92206 };
        movimiento.medioDePago = medioDePago;
        const estado: IEstadoMovimiento = { id: 27688 };
        movimiento.estado = estado;
        const tipoMovimiento: ITipoMovimiento = { id: 84755 };
        movimiento.tipoMovimiento = tipoMovimiento;
        const empleado: IEmpleado = { id: 77922 };
        movimiento.empleado = empleado;
        const caja: ICaja = { id: 46538 };
        movimiento.caja = caja;
        const subCategoria: ISubCategoria = { id: 20788 };
        movimiento.subCategoria = subCategoria;

        activatedRoute.data = of({ movimiento });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(movimiento));
        expect(comp.medioDePagosCollection).toContain(medioDePago);
        expect(comp.estadoMovimientosSharedCollection).toContain(estado);
        expect(comp.tipoMovimientosSharedCollection).toContain(tipoMovimiento);
        expect(comp.empleadosSharedCollection).toContain(empleado);
        expect(comp.cajasSharedCollection).toContain(caja);
        expect(comp.subCategoriasSharedCollection).toContain(subCategoria);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Movimiento>>();
        const movimiento = { id: 123 };
        jest.spyOn(movimientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ movimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: movimiento }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(movimientoService.update).toHaveBeenCalledWith(movimiento);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Movimiento>>();
        const movimiento = new Movimiento();
        jest.spyOn(movimientoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ movimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: movimiento }));
        saveSubject.complete();

        // THEN
        expect(movimientoService.create).toHaveBeenCalledWith(movimiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Movimiento>>();
        const movimiento = { id: 123 };
        jest.spyOn(movimientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ movimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(movimientoService.update).toHaveBeenCalledWith(movimiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackMedioDePagoById', () => {
        it('Should return tracked MedioDePago primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMedioDePagoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackEstadoMovimientoById', () => {
        it('Should return tracked EstadoMovimiento primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEstadoMovimientoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackTipoMovimientoById', () => {
        it('Should return tracked TipoMovimiento primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTipoMovimientoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackEmpleadoById', () => {
        it('Should return tracked Empleado primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEmpleadoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCajaById', () => {
        it('Should return tracked Caja primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCajaById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackSubCategoriaById', () => {
        it('Should return tracked SubCategoria primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackSubCategoriaById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
