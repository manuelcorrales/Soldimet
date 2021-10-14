jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DetallePedidoService } from '../service/detalle-pedido.service';
import { IDetallePedido, DetallePedido } from '../detalle-pedido.model';
import { IDetallePresupuesto } from 'app/entities/detalle-presupuesto/detalle-presupuesto.model';
import { DetallePresupuestoService } from 'app/entities/detalle-presupuesto/service/detalle-presupuesto.service';

import { DetallePedidoUpdateComponent } from './detalle-pedido-update.component';

describe('Component Tests', () => {
  describe('DetallePedido Management Update Component', () => {
    let comp: DetallePedidoUpdateComponent;
    let fixture: ComponentFixture<DetallePedidoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let detallePedidoService: DetallePedidoService;
    let detallePresupuestoService: DetallePresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DetallePedidoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DetallePedidoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetallePedidoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      detallePedidoService = TestBed.inject(DetallePedidoService);
      detallePresupuestoService = TestBed.inject(DetallePresupuestoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call detallePresupuesto query and add missing value', () => {
        const detallePedido: IDetallePedido = { id: 456 };
        const detallePresupuesto: IDetallePresupuesto = { id: 81850 };
        detallePedido.detallePresupuesto = detallePresupuesto;

        const detallePresupuestoCollection: IDetallePresupuesto[] = [{ id: 34941 }];
        jest.spyOn(detallePresupuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: detallePresupuestoCollection })));
        const expectedCollection: IDetallePresupuesto[] = [detallePresupuesto, ...detallePresupuestoCollection];
        jest.spyOn(detallePresupuestoService, 'addDetallePresupuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ detallePedido });
        comp.ngOnInit();

        expect(detallePresupuestoService.query).toHaveBeenCalled();
        expect(detallePresupuestoService.addDetallePresupuestoToCollectionIfMissing).toHaveBeenCalledWith(
          detallePresupuestoCollection,
          detallePresupuesto
        );
        expect(comp.detallePresupuestosCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const detallePedido: IDetallePedido = { id: 456 };
        const detallePresupuesto: IDetallePresupuesto = { id: 82124 };
        detallePedido.detallePresupuesto = detallePresupuesto;

        activatedRoute.data = of({ detallePedido });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(detallePedido));
        expect(comp.detallePresupuestosCollection).toContain(detallePresupuesto);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DetallePedido>>();
        const detallePedido = { id: 123 };
        jest.spyOn(detallePedidoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ detallePedido });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: detallePedido }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(detallePedidoService.update).toHaveBeenCalledWith(detallePedido);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DetallePedido>>();
        const detallePedido = new DetallePedido();
        jest.spyOn(detallePedidoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ detallePedido });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: detallePedido }));
        saveSubject.complete();

        // THEN
        expect(detallePedidoService.create).toHaveBeenCalledWith(detallePedido);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DetallePedido>>();
        const detallePedido = { id: 123 };
        jest.spyOn(detallePedidoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ detallePedido });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(detallePedidoService.update).toHaveBeenCalledWith(detallePedido);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackDetallePresupuestoById', () => {
        it('Should return tracked DetallePresupuesto primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackDetallePresupuestoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
