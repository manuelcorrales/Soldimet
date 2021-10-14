jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PresupuestoService } from '../service/presupuesto.service';
import { IPresupuesto, Presupuesto } from '../presupuesto.model';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { IEstadoPresupuesto } from 'app/entities/estado-presupuesto/estado-presupuesto.model';
import { EstadoPresupuestoService } from 'app/entities/estado-presupuesto/service/estado-presupuesto.service';
import { IDocumentationType } from 'app/entities/documentation-type/documentation-type.model';
import { DocumentationTypeService } from 'app/entities/documentation-type/service/documentation-type.service';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/service/sucursal.service';

import { PresupuestoUpdateComponent } from './presupuesto-update.component';

describe('Component Tests', () => {
  describe('Presupuesto Management Update Component', () => {
    let comp: PresupuestoUpdateComponent;
    let fixture: ComponentFixture<PresupuestoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let presupuestoService: PresupuestoService;
    let clienteService: ClienteService;
    let estadoPresupuestoService: EstadoPresupuestoService;
    let documentationTypeService: DocumentationTypeService;
    let sucursalService: SucursalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PresupuestoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PresupuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PresupuestoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      presupuestoService = TestBed.inject(PresupuestoService);
      clienteService = TestBed.inject(ClienteService);
      estadoPresupuestoService = TestBed.inject(EstadoPresupuestoService);
      documentationTypeService = TestBed.inject(DocumentationTypeService);
      sucursalService = TestBed.inject(SucursalService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Cliente query and add missing value', () => {
        const presupuesto: IPresupuesto = { id: 456 };
        const cliente: ICliente = { id: 52970 };
        presupuesto.cliente = cliente;

        const clienteCollection: ICliente[] = [{ id: 25782 }];
        jest.spyOn(clienteService, 'query').mockReturnValue(of(new HttpResponse({ body: clienteCollection })));
        const additionalClientes = [cliente];
        const expectedCollection: ICliente[] = [...additionalClientes, ...clienteCollection];
        jest.spyOn(clienteService, 'addClienteToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ presupuesto });
        comp.ngOnInit();

        expect(clienteService.query).toHaveBeenCalled();
        expect(clienteService.addClienteToCollectionIfMissing).toHaveBeenCalledWith(clienteCollection, ...additionalClientes);
        expect(comp.clientesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call EstadoPresupuesto query and add missing value', () => {
        const presupuesto: IPresupuesto = { id: 456 };
        const estadoPresupuesto: IEstadoPresupuesto = { id: 10531 };
        presupuesto.estadoPresupuesto = estadoPresupuesto;

        const estadoPresupuestoCollection: IEstadoPresupuesto[] = [{ id: 98930 }];
        jest.spyOn(estadoPresupuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: estadoPresupuestoCollection })));
        const additionalEstadoPresupuestos = [estadoPresupuesto];
        const expectedCollection: IEstadoPresupuesto[] = [...additionalEstadoPresupuestos, ...estadoPresupuestoCollection];
        jest.spyOn(estadoPresupuestoService, 'addEstadoPresupuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ presupuesto });
        comp.ngOnInit();

        expect(estadoPresupuestoService.query).toHaveBeenCalled();
        expect(estadoPresupuestoService.addEstadoPresupuestoToCollectionIfMissing).toHaveBeenCalledWith(
          estadoPresupuestoCollection,
          ...additionalEstadoPresupuestos
        );
        expect(comp.estadoPresupuestosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call DocumentationType query and add missing value', () => {
        const presupuesto: IPresupuesto = { id: 456 };
        const documentType: IDocumentationType = { id: 31885 };
        presupuesto.documentType = documentType;

        const documentationTypeCollection: IDocumentationType[] = [{ id: 22399 }];
        jest.spyOn(documentationTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: documentationTypeCollection })));
        const additionalDocumentationTypes = [documentType];
        const expectedCollection: IDocumentationType[] = [...additionalDocumentationTypes, ...documentationTypeCollection];
        jest.spyOn(documentationTypeService, 'addDocumentationTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ presupuesto });
        comp.ngOnInit();

        expect(documentationTypeService.query).toHaveBeenCalled();
        expect(documentationTypeService.addDocumentationTypeToCollectionIfMissing).toHaveBeenCalledWith(
          documentationTypeCollection,
          ...additionalDocumentationTypes
        );
        expect(comp.documentationTypesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Sucursal query and add missing value', () => {
        const presupuesto: IPresupuesto = { id: 456 };
        const sucursal: ISucursal = { id: 87236 };
        presupuesto.sucursal = sucursal;

        const sucursalCollection: ISucursal[] = [{ id: 10865 }];
        jest.spyOn(sucursalService, 'query').mockReturnValue(of(new HttpResponse({ body: sucursalCollection })));
        const additionalSucursals = [sucursal];
        const expectedCollection: ISucursal[] = [...additionalSucursals, ...sucursalCollection];
        jest.spyOn(sucursalService, 'addSucursalToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ presupuesto });
        comp.ngOnInit();

        expect(sucursalService.query).toHaveBeenCalled();
        expect(sucursalService.addSucursalToCollectionIfMissing).toHaveBeenCalledWith(sucursalCollection, ...additionalSucursals);
        expect(comp.sucursalsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const presupuesto: IPresupuesto = { id: 456 };
        const cliente: ICliente = { id: 4037 };
        presupuesto.cliente = cliente;
        const estadoPresupuesto: IEstadoPresupuesto = { id: 31405 };
        presupuesto.estadoPresupuesto = estadoPresupuesto;
        const documentType: IDocumentationType = { id: 6835 };
        presupuesto.documentType = documentType;
        const sucursal: ISucursal = { id: 41013 };
        presupuesto.sucursal = sucursal;

        activatedRoute.data = of({ presupuesto });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(presupuesto));
        expect(comp.clientesSharedCollection).toContain(cliente);
        expect(comp.estadoPresupuestosSharedCollection).toContain(estadoPresupuesto);
        expect(comp.documentationTypesSharedCollection).toContain(documentType);
        expect(comp.sucursalsSharedCollection).toContain(sucursal);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Presupuesto>>();
        const presupuesto = { id: 123 };
        jest.spyOn(presupuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ presupuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: presupuesto }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(presupuestoService.update).toHaveBeenCalledWith(presupuesto);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Presupuesto>>();
        const presupuesto = new Presupuesto();
        jest.spyOn(presupuestoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ presupuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: presupuesto }));
        saveSubject.complete();

        // THEN
        expect(presupuestoService.create).toHaveBeenCalledWith(presupuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Presupuesto>>();
        const presupuesto = { id: 123 };
        jest.spyOn(presupuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ presupuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(presupuestoService.update).toHaveBeenCalledWith(presupuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackClienteById', () => {
        it('Should return tracked Cliente primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackClienteById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackEstadoPresupuestoById', () => {
        it('Should return tracked EstadoPresupuesto primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEstadoPresupuestoById(0, entity);
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
