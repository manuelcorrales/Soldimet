jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ArticuloService } from '../service/articulo.service';
import { IArticulo, Articulo } from '../articulo.model';
import { IEstadoArticulo } from 'app/entities/estado-articulo/estado-articulo.model';
import { EstadoArticuloService } from 'app/entities/estado-articulo/service/estado-articulo.service';
import { IMarca } from 'app/entities/marca/marca.model';
import { MarcaService } from 'app/entities/marca/service/marca.service';
import { ITipoRepuesto } from 'app/entities/tipo-repuesto/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/service/tipo-repuesto.service';

import { ArticuloUpdateComponent } from './articulo-update.component';

describe('Component Tests', () => {
  describe('Articulo Management Update Component', () => {
    let comp: ArticuloUpdateComponent;
    let fixture: ComponentFixture<ArticuloUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let articuloService: ArticuloService;
    let estadoArticuloService: EstadoArticuloService;
    let marcaService: MarcaService;
    let tipoRepuestoService: TipoRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ArticuloUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ArticuloUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArticuloUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      articuloService = TestBed.inject(ArticuloService);
      estadoArticuloService = TestBed.inject(EstadoArticuloService);
      marcaService = TestBed.inject(MarcaService);
      tipoRepuestoService = TestBed.inject(TipoRepuestoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call EstadoArticulo query and add missing value', () => {
        const articulo: IArticulo = { id: 456 };
        const estado: IEstadoArticulo = { id: 29127 };
        articulo.estado = estado;

        const estadoArticuloCollection: IEstadoArticulo[] = [{ id: 77572 }];
        jest.spyOn(estadoArticuloService, 'query').mockReturnValue(of(new HttpResponse({ body: estadoArticuloCollection })));
        const additionalEstadoArticulos = [estado];
        const expectedCollection: IEstadoArticulo[] = [...additionalEstadoArticulos, ...estadoArticuloCollection];
        jest.spyOn(estadoArticuloService, 'addEstadoArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ articulo });
        comp.ngOnInit();

        expect(estadoArticuloService.query).toHaveBeenCalled();
        expect(estadoArticuloService.addEstadoArticuloToCollectionIfMissing).toHaveBeenCalledWith(
          estadoArticuloCollection,
          ...additionalEstadoArticulos
        );
        expect(comp.estadoArticulosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Marca query and add missing value', () => {
        const articulo: IArticulo = { id: 456 };
        const marca: IMarca = { id: 47587 };
        articulo.marca = marca;

        const marcaCollection: IMarca[] = [{ id: 59863 }];
        jest.spyOn(marcaService, 'query').mockReturnValue(of(new HttpResponse({ body: marcaCollection })));
        const additionalMarcas = [marca];
        const expectedCollection: IMarca[] = [...additionalMarcas, ...marcaCollection];
        jest.spyOn(marcaService, 'addMarcaToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ articulo });
        comp.ngOnInit();

        expect(marcaService.query).toHaveBeenCalled();
        expect(marcaService.addMarcaToCollectionIfMissing).toHaveBeenCalledWith(marcaCollection, ...additionalMarcas);
        expect(comp.marcasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call TipoRepuesto query and add missing value', () => {
        const articulo: IArticulo = { id: 456 };
        const tipoRepuesto: ITipoRepuesto = { id: 71278 };
        articulo.tipoRepuesto = tipoRepuesto;

        const tipoRepuestoCollection: ITipoRepuesto[] = [{ id: 945 }];
        jest.spyOn(tipoRepuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoRepuestoCollection })));
        const additionalTipoRepuestos = [tipoRepuesto];
        const expectedCollection: ITipoRepuesto[] = [...additionalTipoRepuestos, ...tipoRepuestoCollection];
        jest.spyOn(tipoRepuestoService, 'addTipoRepuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ articulo });
        comp.ngOnInit();

        expect(tipoRepuestoService.query).toHaveBeenCalled();
        expect(tipoRepuestoService.addTipoRepuestoToCollectionIfMissing).toHaveBeenCalledWith(
          tipoRepuestoCollection,
          ...additionalTipoRepuestos
        );
        expect(comp.tipoRepuestosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const articulo: IArticulo = { id: 456 };
        const estado: IEstadoArticulo = { id: 92112 };
        articulo.estado = estado;
        const marca: IMarca = { id: 62586 };
        articulo.marca = marca;
        const tipoRepuesto: ITipoRepuesto = { id: 48754 };
        articulo.tipoRepuesto = tipoRepuesto;

        activatedRoute.data = of({ articulo });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(articulo));
        expect(comp.estadoArticulosSharedCollection).toContain(estado);
        expect(comp.marcasSharedCollection).toContain(marca);
        expect(comp.tipoRepuestosSharedCollection).toContain(tipoRepuesto);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Articulo>>();
        const articulo = { id: 123 };
        jest.spyOn(articuloService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ articulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: articulo }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(articuloService.update).toHaveBeenCalledWith(articulo);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Articulo>>();
        const articulo = new Articulo();
        jest.spyOn(articuloService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ articulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: articulo }));
        saveSubject.complete();

        // THEN
        expect(articuloService.create).toHaveBeenCalledWith(articulo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Articulo>>();
        const articulo = { id: 123 };
        jest.spyOn(articuloService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ articulo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(articuloService.update).toHaveBeenCalledWith(articulo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackEstadoArticuloById', () => {
        it('Should return tracked EstadoArticulo primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEstadoArticuloById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackMarcaById', () => {
        it('Should return tracked Marca primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMarcaById(0, entity);
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
    });
  });
});
