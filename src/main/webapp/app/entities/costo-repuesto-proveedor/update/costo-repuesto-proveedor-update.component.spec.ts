jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CostoRepuestoProveedorService } from '../service/costo-repuesto-proveedor.service';
import { ICostoRepuestoProveedor, CostoRepuestoProveedor } from '../costo-repuesto-proveedor.model';
import { ITipoRepuesto } from 'app/entities/tipo-repuesto/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/service/tipo-repuesto.service';
import { IAplicacion } from 'app/entities/aplicacion/aplicacion.model';
import { AplicacionService } from 'app/entities/aplicacion/service/aplicacion.service';
import { ICilindrada } from 'app/entities/cilindrada/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/service/cilindrada.service';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';

import { CostoRepuestoProveedorUpdateComponent } from './costo-repuesto-proveedor-update.component';

describe('Component Tests', () => {
  describe('CostoRepuestoProveedor Management Update Component', () => {
    let comp: CostoRepuestoProveedorUpdateComponent;
    let fixture: ComponentFixture<CostoRepuestoProveedorUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let costoRepuestoProveedorService: CostoRepuestoProveedorService;
    let tipoRepuestoService: TipoRepuestoService;
    let aplicacionService: AplicacionService;
    let cilindradaService: CilindradaService;
    let articuloService: ArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CostoRepuestoProveedorUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CostoRepuestoProveedorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CostoRepuestoProveedorUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      costoRepuestoProveedorService = TestBed.inject(CostoRepuestoProveedorService);
      tipoRepuestoService = TestBed.inject(TipoRepuestoService);
      aplicacionService = TestBed.inject(AplicacionService);
      cilindradaService = TestBed.inject(CilindradaService);
      articuloService = TestBed.inject(ArticuloService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call TipoRepuesto query and add missing value', () => {
        const costoRepuestoProveedor: ICostoRepuestoProveedor = { id: 456 };
        const tipoRepuesto: ITipoRepuesto = { id: 9377 };
        costoRepuestoProveedor.tipoRepuesto = tipoRepuesto;

        const tipoRepuestoCollection: ITipoRepuesto[] = [{ id: 71905 }];
        jest.spyOn(tipoRepuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoRepuestoCollection })));
        const additionalTipoRepuestos = [tipoRepuesto];
        const expectedCollection: ITipoRepuesto[] = [...additionalTipoRepuestos, ...tipoRepuestoCollection];
        jest.spyOn(tipoRepuestoService, 'addTipoRepuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ costoRepuestoProveedor });
        comp.ngOnInit();

        expect(tipoRepuestoService.query).toHaveBeenCalled();
        expect(tipoRepuestoService.addTipoRepuestoToCollectionIfMissing).toHaveBeenCalledWith(
          tipoRepuestoCollection,
          ...additionalTipoRepuestos
        );
        expect(comp.tipoRepuestosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Aplicacion query and add missing value', () => {
        const costoRepuestoProveedor: ICostoRepuestoProveedor = { id: 456 };
        const aplicacion: IAplicacion = { id: 89556 };
        costoRepuestoProveedor.aplicacion = aplicacion;

        const aplicacionCollection: IAplicacion[] = [{ id: 11543 }];
        jest.spyOn(aplicacionService, 'query').mockReturnValue(of(new HttpResponse({ body: aplicacionCollection })));
        const additionalAplicacions = [aplicacion];
        const expectedCollection: IAplicacion[] = [...additionalAplicacions, ...aplicacionCollection];
        jest.spyOn(aplicacionService, 'addAplicacionToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ costoRepuestoProveedor });
        comp.ngOnInit();

        expect(aplicacionService.query).toHaveBeenCalled();
        expect(aplicacionService.addAplicacionToCollectionIfMissing).toHaveBeenCalledWith(aplicacionCollection, ...additionalAplicacions);
        expect(comp.aplicacionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Cilindrada query and add missing value', () => {
        const costoRepuestoProveedor: ICostoRepuestoProveedor = { id: 456 };
        const cilindrada: ICilindrada = { id: 45355 };
        costoRepuestoProveedor.cilindrada = cilindrada;

        const cilindradaCollection: ICilindrada[] = [{ id: 90034 }];
        jest.spyOn(cilindradaService, 'query').mockReturnValue(of(new HttpResponse({ body: cilindradaCollection })));
        const additionalCilindradas = [cilindrada];
        const expectedCollection: ICilindrada[] = [...additionalCilindradas, ...cilindradaCollection];
        jest.spyOn(cilindradaService, 'addCilindradaToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ costoRepuestoProveedor });
        comp.ngOnInit();

        expect(cilindradaService.query).toHaveBeenCalled();
        expect(cilindradaService.addCilindradaToCollectionIfMissing).toHaveBeenCalledWith(cilindradaCollection, ...additionalCilindradas);
        expect(comp.cilindradasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Articulo query and add missing value', () => {
        const costoRepuestoProveedor: ICostoRepuestoProveedor = { id: 456 };
        const articulo: IArticulo = { id: 64065 };
        costoRepuestoProveedor.articulo = articulo;

        const articuloCollection: IArticulo[] = [{ id: 12811 }];
        jest.spyOn(articuloService, 'query').mockReturnValue(of(new HttpResponse({ body: articuloCollection })));
        const additionalArticulos = [articulo];
        const expectedCollection: IArticulo[] = [...additionalArticulos, ...articuloCollection];
        jest.spyOn(articuloService, 'addArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ costoRepuestoProveedor });
        comp.ngOnInit();

        expect(articuloService.query).toHaveBeenCalled();
        expect(articuloService.addArticuloToCollectionIfMissing).toHaveBeenCalledWith(articuloCollection, ...additionalArticulos);
        expect(comp.articulosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const costoRepuestoProveedor: ICostoRepuestoProveedor = { id: 456 };
        const tipoRepuesto: ITipoRepuesto = { id: 46957 };
        costoRepuestoProveedor.tipoRepuesto = tipoRepuesto;
        const aplicacion: IAplicacion = { id: 6759 };
        costoRepuestoProveedor.aplicacion = aplicacion;
        const cilindrada: ICilindrada = { id: 76174 };
        costoRepuestoProveedor.cilindrada = cilindrada;
        const articulo: IArticulo = { id: 85507 };
        costoRepuestoProveedor.articulo = articulo;

        activatedRoute.data = of({ costoRepuestoProveedor });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(costoRepuestoProveedor));
        expect(comp.tipoRepuestosSharedCollection).toContain(tipoRepuesto);
        expect(comp.aplicacionsSharedCollection).toContain(aplicacion);
        expect(comp.cilindradasSharedCollection).toContain(cilindrada);
        expect(comp.articulosSharedCollection).toContain(articulo);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CostoRepuestoProveedor>>();
        const costoRepuestoProveedor = { id: 123 };
        jest.spyOn(costoRepuestoProveedorService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ costoRepuestoProveedor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: costoRepuestoProveedor }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(costoRepuestoProveedorService.update).toHaveBeenCalledWith(costoRepuestoProveedor);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CostoRepuestoProveedor>>();
        const costoRepuestoProveedor = new CostoRepuestoProveedor();
        jest.spyOn(costoRepuestoProveedorService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ costoRepuestoProveedor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: costoRepuestoProveedor }));
        saveSubject.complete();

        // THEN
        expect(costoRepuestoProveedorService.create).toHaveBeenCalledWith(costoRepuestoProveedor);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CostoRepuestoProveedor>>();
        const costoRepuestoProveedor = { id: 123 };
        jest.spyOn(costoRepuestoProveedorService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ costoRepuestoProveedor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(costoRepuestoProveedorService.update).toHaveBeenCalledWith(costoRepuestoProveedor);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackTipoRepuestoById', () => {
        it('Should return tracked TipoRepuesto primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTipoRepuestoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackAplicacionById', () => {
        it('Should return tracked Aplicacion primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackAplicacionById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCilindradaById', () => {
        it('Should return tracked Cilindrada primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCilindradaById(0, entity);
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
    });
  });
});
