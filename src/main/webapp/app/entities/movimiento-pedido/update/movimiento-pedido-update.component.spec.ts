jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MovimientoPedidoService } from '../service/movimiento-pedido.service';
import { IMovimientoPedido, MovimientoPedido } from '../movimiento-pedido.model';
import { IMovimiento } from 'app/entities/movimiento/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento/service/movimiento.service';
import { IPedidoRepuesto } from 'app/entities/pedido-repuesto/pedido-repuesto.model';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto/service/pedido-repuesto.service';

import { MovimientoPedidoUpdateComponent } from './movimiento-pedido-update.component';

describe('Component Tests', () => {
  describe('MovimientoPedido Management Update Component', () => {
    let comp: MovimientoPedidoUpdateComponent;
    let fixture: ComponentFixture<MovimientoPedidoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let movimientoPedidoService: MovimientoPedidoService;
    let movimientoService: MovimientoService;
    let pedidoRepuestoService: PedidoRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MovimientoPedidoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MovimientoPedidoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoPedidoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      movimientoPedidoService = TestBed.inject(MovimientoPedidoService);
      movimientoService = TestBed.inject(MovimientoService);
      pedidoRepuestoService = TestBed.inject(PedidoRepuestoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call movimiento query and add missing value', () => {
        const movimientoPedido: IMovimientoPedido = { id: 456 };
        const movimiento: IMovimiento = { id: 83911 };
        movimientoPedido.movimiento = movimiento;

        const movimientoCollection: IMovimiento[] = [{ id: 81533 }];
        jest.spyOn(movimientoService, 'query').mockReturnValue(of(new HttpResponse({ body: movimientoCollection })));
        const expectedCollection: IMovimiento[] = [movimiento, ...movimientoCollection];
        jest.spyOn(movimientoService, 'addMovimientoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ movimientoPedido });
        comp.ngOnInit();

        expect(movimientoService.query).toHaveBeenCalled();
        expect(movimientoService.addMovimientoToCollectionIfMissing).toHaveBeenCalledWith(movimientoCollection, movimiento);
        expect(comp.movimientosCollection).toEqual(expectedCollection);
      });

      it('Should call PedidoRepuesto query and add missing value', () => {
        const movimientoPedido: IMovimientoPedido = { id: 456 };
        const pedidoRepuesto: IPedidoRepuesto = { id: 91053 };
        movimientoPedido.pedidoRepuesto = pedidoRepuesto;

        const pedidoRepuestoCollection: IPedidoRepuesto[] = [{ id: 50430 }];
        jest.spyOn(pedidoRepuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: pedidoRepuestoCollection })));
        const additionalPedidoRepuestos = [pedidoRepuesto];
        const expectedCollection: IPedidoRepuesto[] = [...additionalPedidoRepuestos, ...pedidoRepuestoCollection];
        jest.spyOn(pedidoRepuestoService, 'addPedidoRepuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ movimientoPedido });
        comp.ngOnInit();

        expect(pedidoRepuestoService.query).toHaveBeenCalled();
        expect(pedidoRepuestoService.addPedidoRepuestoToCollectionIfMissing).toHaveBeenCalledWith(
          pedidoRepuestoCollection,
          ...additionalPedidoRepuestos
        );
        expect(comp.pedidoRepuestosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const movimientoPedido: IMovimientoPedido = { id: 456 };
        const movimiento: IMovimiento = { id: 1501 };
        movimientoPedido.movimiento = movimiento;
        const pedidoRepuesto: IPedidoRepuesto = { id: 16104 };
        movimientoPedido.pedidoRepuesto = pedidoRepuesto;

        activatedRoute.data = of({ movimientoPedido });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(movimientoPedido));
        expect(comp.movimientosCollection).toContain(movimiento);
        expect(comp.pedidoRepuestosSharedCollection).toContain(pedidoRepuesto);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MovimientoPedido>>();
        const movimientoPedido = { id: 123 };
        jest.spyOn(movimientoPedidoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ movimientoPedido });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: movimientoPedido }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(movimientoPedidoService.update).toHaveBeenCalledWith(movimientoPedido);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MovimientoPedido>>();
        const movimientoPedido = new MovimientoPedido();
        jest.spyOn(movimientoPedidoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ movimientoPedido });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: movimientoPedido }));
        saveSubject.complete();

        // THEN
        expect(movimientoPedidoService.create).toHaveBeenCalledWith(movimientoPedido);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MovimientoPedido>>();
        const movimientoPedido = { id: 123 };
        jest.spyOn(movimientoPedidoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ movimientoPedido });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(movimientoPedidoService.update).toHaveBeenCalledWith(movimientoPedido);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackMovimientoById', () => {
        it('Should return tracked Movimiento primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMovimientoById(0, entity);
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
    });
  });
});
