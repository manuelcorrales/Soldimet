jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PedidoRepuestoService } from '../service/pedido-repuesto.service';
import { IPedidoRepuesto, PedidoRepuesto } from '../pedido-repuesto.model';
import { IEstadoPedidoRepuesto } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from 'app/entities/estado-pedido-repuesto/service/estado-pedido-repuesto.service';
import { IPresupuesto } from 'app/entities/presupuesto/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto/service/presupuesto.service';
import { IDocumentationType } from 'app/entities/documentation-type/documentation-type.model';
import { DocumentationTypeService } from 'app/entities/documentation-type/service/documentation-type.service';

import { PedidoRepuestoUpdateComponent } from './pedido-repuesto-update.component';

describe('Component Tests', () => {
  describe('PedidoRepuesto Management Update Component', () => {
    let comp: PedidoRepuestoUpdateComponent;
    let fixture: ComponentFixture<PedidoRepuestoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let pedidoRepuestoService: PedidoRepuestoService;
    let estadoPedidoRepuestoService: EstadoPedidoRepuestoService;
    let presupuestoService: PresupuestoService;
    let documentationTypeService: DocumentationTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PedidoRepuestoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PedidoRepuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PedidoRepuestoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      pedidoRepuestoService = TestBed.inject(PedidoRepuestoService);
      estadoPedidoRepuestoService = TestBed.inject(EstadoPedidoRepuestoService);
      presupuestoService = TestBed.inject(PresupuestoService);
      documentationTypeService = TestBed.inject(DocumentationTypeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call EstadoPedidoRepuesto query and add missing value', () => {
        const pedidoRepuesto: IPedidoRepuesto = { id: 456 };
        const estadoPedidoRepuesto: IEstadoPedidoRepuesto = { id: 68407 };
        pedidoRepuesto.estadoPedidoRepuesto = estadoPedidoRepuesto;

        const estadoPedidoRepuestoCollection: IEstadoPedidoRepuesto[] = [{ id: 93942 }];
        jest.spyOn(estadoPedidoRepuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: estadoPedidoRepuestoCollection })));
        const additionalEstadoPedidoRepuestos = [estadoPedidoRepuesto];
        const expectedCollection: IEstadoPedidoRepuesto[] = [...additionalEstadoPedidoRepuestos, ...estadoPedidoRepuestoCollection];
        jest.spyOn(estadoPedidoRepuestoService, 'addEstadoPedidoRepuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ pedidoRepuesto });
        comp.ngOnInit();

        expect(estadoPedidoRepuestoService.query).toHaveBeenCalled();
        expect(estadoPedidoRepuestoService.addEstadoPedidoRepuestoToCollectionIfMissing).toHaveBeenCalledWith(
          estadoPedidoRepuestoCollection,
          ...additionalEstadoPedidoRepuestos
        );
        expect(comp.estadoPedidoRepuestosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Presupuesto query and add missing value', () => {
        const pedidoRepuesto: IPedidoRepuesto = { id: 456 };
        const presupuesto: IPresupuesto = { id: 80015 };
        pedidoRepuesto.presupuesto = presupuesto;

        const presupuestoCollection: IPresupuesto[] = [{ id: 85168 }];
        jest.spyOn(presupuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: presupuestoCollection })));
        const additionalPresupuestos = [presupuesto];
        const expectedCollection: IPresupuesto[] = [...additionalPresupuestos, ...presupuestoCollection];
        jest.spyOn(presupuestoService, 'addPresupuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ pedidoRepuesto });
        comp.ngOnInit();

        expect(presupuestoService.query).toHaveBeenCalled();
        expect(presupuestoService.addPresupuestoToCollectionIfMissing).toHaveBeenCalledWith(
          presupuestoCollection,
          ...additionalPresupuestos
        );
        expect(comp.presupuestosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call DocumentationType query and add missing value', () => {
        const pedidoRepuesto: IPedidoRepuesto = { id: 456 };
        const documentType: IDocumentationType = { id: 41563 };
        pedidoRepuesto.documentType = documentType;

        const documentationTypeCollection: IDocumentationType[] = [{ id: 77970 }];
        jest.spyOn(documentationTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: documentationTypeCollection })));
        const additionalDocumentationTypes = [documentType];
        const expectedCollection: IDocumentationType[] = [...additionalDocumentationTypes, ...documentationTypeCollection];
        jest.spyOn(documentationTypeService, 'addDocumentationTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ pedidoRepuesto });
        comp.ngOnInit();

        expect(documentationTypeService.query).toHaveBeenCalled();
        expect(documentationTypeService.addDocumentationTypeToCollectionIfMissing).toHaveBeenCalledWith(
          documentationTypeCollection,
          ...additionalDocumentationTypes
        );
        expect(comp.documentationTypesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const pedidoRepuesto: IPedidoRepuesto = { id: 456 };
        const estadoPedidoRepuesto: IEstadoPedidoRepuesto = { id: 69837 };
        pedidoRepuesto.estadoPedidoRepuesto = estadoPedidoRepuesto;
        const presupuesto: IPresupuesto = { id: 74623 };
        pedidoRepuesto.presupuesto = presupuesto;
        const documentType: IDocumentationType = { id: 97723 };
        pedidoRepuesto.documentType = documentType;

        activatedRoute.data = of({ pedidoRepuesto });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(pedidoRepuesto));
        expect(comp.estadoPedidoRepuestosSharedCollection).toContain(estadoPedidoRepuesto);
        expect(comp.presupuestosSharedCollection).toContain(presupuesto);
        expect(comp.documentationTypesSharedCollection).toContain(documentType);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PedidoRepuesto>>();
        const pedidoRepuesto = { id: 123 };
        jest.spyOn(pedidoRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ pedidoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pedidoRepuesto }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(pedidoRepuestoService.update).toHaveBeenCalledWith(pedidoRepuesto);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PedidoRepuesto>>();
        const pedidoRepuesto = new PedidoRepuesto();
        jest.spyOn(pedidoRepuestoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ pedidoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pedidoRepuesto }));
        saveSubject.complete();

        // THEN
        expect(pedidoRepuestoService.create).toHaveBeenCalledWith(pedidoRepuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PedidoRepuesto>>();
        const pedidoRepuesto = { id: 123 };
        jest.spyOn(pedidoRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ pedidoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(pedidoRepuestoService.update).toHaveBeenCalledWith(pedidoRepuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackEstadoPedidoRepuestoById', () => {
        it('Should return tracked EstadoPedidoRepuesto primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEstadoPedidoRepuestoById(0, entity);
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

      describe('trackDocumentationTypeById', () => {
        it('Should return tracked DocumentationType primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackDocumentationTypeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
