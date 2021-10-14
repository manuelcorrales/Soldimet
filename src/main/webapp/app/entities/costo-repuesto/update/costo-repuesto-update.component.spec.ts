jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CostoRepuestoService } from '../service/costo-repuesto.service';
import { ICostoRepuesto, CostoRepuesto } from '../costo-repuesto.model';
import { IEstadoCostoRepuesto } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from 'app/entities/estado-costo-repuesto/service/estado-costo-repuesto.service';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';
import { ITipoRepuesto } from 'app/entities/tipo-repuesto/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/service/tipo-repuesto.service';
import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';
import { MedidaArticuloService } from 'app/entities/medida-articulo/service/medida-articulo.service';

import { CostoRepuestoUpdateComponent } from './costo-repuesto-update.component';

describe('Component Tests', () => {
  describe('CostoRepuesto Management Update Component', () => {
    let comp: CostoRepuestoUpdateComponent;
    let fixture: ComponentFixture<CostoRepuestoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let costoRepuestoService: CostoRepuestoService;
    let estadoCostoRepuestoService: EstadoCostoRepuestoService;
    let articuloService: ArticuloService;
    let tipoRepuestoService: TipoRepuestoService;
    let medidaArticuloService: MedidaArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CostoRepuestoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CostoRepuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CostoRepuestoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      costoRepuestoService = TestBed.inject(CostoRepuestoService);
      estadoCostoRepuestoService = TestBed.inject(EstadoCostoRepuestoService);
      articuloService = TestBed.inject(ArticuloService);
      tipoRepuestoService = TestBed.inject(TipoRepuestoService);
      medidaArticuloService = TestBed.inject(MedidaArticuloService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call EstadoCostoRepuesto query and add missing value', () => {
        const costoRepuesto: ICostoRepuesto = { id: 456 };
        const estado: IEstadoCostoRepuesto = { id: 73828 };
        costoRepuesto.estado = estado;

        const estadoCostoRepuestoCollection: IEstadoCostoRepuesto[] = [{ id: 55336 }];
        jest.spyOn(estadoCostoRepuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: estadoCostoRepuestoCollection })));
        const additionalEstadoCostoRepuestos = [estado];
        const expectedCollection: IEstadoCostoRepuesto[] = [...additionalEstadoCostoRepuestos, ...estadoCostoRepuestoCollection];
        jest.spyOn(estadoCostoRepuestoService, 'addEstadoCostoRepuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ costoRepuesto });
        comp.ngOnInit();

        expect(estadoCostoRepuestoService.query).toHaveBeenCalled();
        expect(estadoCostoRepuestoService.addEstadoCostoRepuestoToCollectionIfMissing).toHaveBeenCalledWith(
          estadoCostoRepuestoCollection,
          ...additionalEstadoCostoRepuestos
        );
        expect(comp.estadoCostoRepuestosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Articulo query and add missing value', () => {
        const costoRepuesto: ICostoRepuesto = { id: 456 };
        const articulo: IArticulo = { id: 93874 };
        costoRepuesto.articulo = articulo;

        const articuloCollection: IArticulo[] = [{ id: 84932 }];
        jest.spyOn(articuloService, 'query').mockReturnValue(of(new HttpResponse({ body: articuloCollection })));
        const additionalArticulos = [articulo];
        const expectedCollection: IArticulo[] = [...additionalArticulos, ...articuloCollection];
        jest.spyOn(articuloService, 'addArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ costoRepuesto });
        comp.ngOnInit();

        expect(articuloService.query).toHaveBeenCalled();
        expect(articuloService.addArticuloToCollectionIfMissing).toHaveBeenCalledWith(articuloCollection, ...additionalArticulos);
        expect(comp.articulosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call TipoRepuesto query and add missing value', () => {
        const costoRepuesto: ICostoRepuesto = { id: 456 };
        const tipoRepuesto: ITipoRepuesto = { id: 29384 };
        costoRepuesto.tipoRepuesto = tipoRepuesto;

        const tipoRepuestoCollection: ITipoRepuesto[] = [{ id: 48139 }];
        jest.spyOn(tipoRepuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoRepuestoCollection })));
        const additionalTipoRepuestos = [tipoRepuesto];
        const expectedCollection: ITipoRepuesto[] = [...additionalTipoRepuestos, ...tipoRepuestoCollection];
        jest.spyOn(tipoRepuestoService, 'addTipoRepuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ costoRepuesto });
        comp.ngOnInit();

        expect(tipoRepuestoService.query).toHaveBeenCalled();
        expect(tipoRepuestoService.addTipoRepuestoToCollectionIfMissing).toHaveBeenCalledWith(
          tipoRepuestoCollection,
          ...additionalTipoRepuestos
        );
        expect(comp.tipoRepuestosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call MedidaArticulo query and add missing value', () => {
        const costoRepuesto: ICostoRepuesto = { id: 456 };
        const medidaArticulo: IMedidaArticulo = { id: 19404 };
        costoRepuesto.medidaArticulo = medidaArticulo;

        const medidaArticuloCollection: IMedidaArticulo[] = [{ id: 95009 }];
        jest.spyOn(medidaArticuloService, 'query').mockReturnValue(of(new HttpResponse({ body: medidaArticuloCollection })));
        const additionalMedidaArticulos = [medidaArticulo];
        const expectedCollection: IMedidaArticulo[] = [...additionalMedidaArticulos, ...medidaArticuloCollection];
        jest.spyOn(medidaArticuloService, 'addMedidaArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ costoRepuesto });
        comp.ngOnInit();

        expect(medidaArticuloService.query).toHaveBeenCalled();
        expect(medidaArticuloService.addMedidaArticuloToCollectionIfMissing).toHaveBeenCalledWith(
          medidaArticuloCollection,
          ...additionalMedidaArticulos
        );
        expect(comp.medidaArticulosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const costoRepuesto: ICostoRepuesto = { id: 456 };
        const estado: IEstadoCostoRepuesto = { id: 6487 };
        costoRepuesto.estado = estado;
        const articulo: IArticulo = { id: 47254 };
        costoRepuesto.articulo = articulo;
        const tipoRepuesto: ITipoRepuesto = { id: 71464 };
        costoRepuesto.tipoRepuesto = tipoRepuesto;
        const medidaArticulo: IMedidaArticulo = { id: 74836 };
        costoRepuesto.medidaArticulo = medidaArticulo;

        activatedRoute.data = of({ costoRepuesto });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(costoRepuesto));
        expect(comp.estadoCostoRepuestosSharedCollection).toContain(estado);
        expect(comp.articulosSharedCollection).toContain(articulo);
        expect(comp.tipoRepuestosSharedCollection).toContain(tipoRepuesto);
        expect(comp.medidaArticulosSharedCollection).toContain(medidaArticulo);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CostoRepuesto>>();
        const costoRepuesto = { id: 123 };
        jest.spyOn(costoRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ costoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: costoRepuesto }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(costoRepuestoService.update).toHaveBeenCalledWith(costoRepuesto);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CostoRepuesto>>();
        const costoRepuesto = new CostoRepuesto();
        jest.spyOn(costoRepuestoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ costoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: costoRepuesto }));
        saveSubject.complete();

        // THEN
        expect(costoRepuestoService.create).toHaveBeenCalledWith(costoRepuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CostoRepuesto>>();
        const costoRepuesto = { id: 123 };
        jest.spyOn(costoRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ costoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(costoRepuestoService.update).toHaveBeenCalledWith(costoRepuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackEstadoCostoRepuestoById', () => {
        it('Should return tracked EstadoCostoRepuesto primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEstadoCostoRepuestoById(0, entity);
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

      describe('trackTipoRepuestoById', () => {
        it('Should return tracked TipoRepuesto primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTipoRepuestoById(0, entity);
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
