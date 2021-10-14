jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CobranzaRepuestoService } from '../service/cobranza-repuesto.service';
import { ICobranzaRepuesto, CobranzaRepuesto } from '../cobranza-repuesto.model';
import { ITipoRepuesto } from 'app/entities/tipo-repuesto/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/service/tipo-repuesto.service';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';

import { CobranzaRepuestoUpdateComponent } from './cobranza-repuesto-update.component';

describe('Component Tests', () => {
  describe('CobranzaRepuesto Management Update Component', () => {
    let comp: CobranzaRepuestoUpdateComponent;
    let fixture: ComponentFixture<CobranzaRepuestoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cobranzaRepuestoService: CobranzaRepuestoService;
    let tipoRepuestoService: TipoRepuestoService;
    let articuloService: ArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CobranzaRepuestoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CobranzaRepuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CobranzaRepuestoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cobranzaRepuestoService = TestBed.inject(CobranzaRepuestoService);
      tipoRepuestoService = TestBed.inject(TipoRepuestoService);
      articuloService = TestBed.inject(ArticuloService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call TipoRepuesto query and add missing value', () => {
        const cobranzaRepuesto: ICobranzaRepuesto = { id: 456 };
        const tipoRepuesto: ITipoRepuesto = { id: 33896 };
        cobranzaRepuesto.tipoRepuesto = tipoRepuesto;

        const tipoRepuestoCollection: ITipoRepuesto[] = [{ id: 2762 }];
        jest.spyOn(tipoRepuestoService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoRepuestoCollection })));
        const additionalTipoRepuestos = [tipoRepuesto];
        const expectedCollection: ITipoRepuesto[] = [...additionalTipoRepuestos, ...tipoRepuestoCollection];
        jest.spyOn(tipoRepuestoService, 'addTipoRepuestoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ cobranzaRepuesto });
        comp.ngOnInit();

        expect(tipoRepuestoService.query).toHaveBeenCalled();
        expect(tipoRepuestoService.addTipoRepuestoToCollectionIfMissing).toHaveBeenCalledWith(
          tipoRepuestoCollection,
          ...additionalTipoRepuestos
        );
        expect(comp.tipoRepuestosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Articulo query and add missing value', () => {
        const cobranzaRepuesto: ICobranzaRepuesto = { id: 456 };
        const articulo: IArticulo = { id: 15805 };
        cobranzaRepuesto.articulo = articulo;

        const articuloCollection: IArticulo[] = [{ id: 78005 }];
        jest.spyOn(articuloService, 'query').mockReturnValue(of(new HttpResponse({ body: articuloCollection })));
        const additionalArticulos = [articulo];
        const expectedCollection: IArticulo[] = [...additionalArticulos, ...articuloCollection];
        jest.spyOn(articuloService, 'addArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ cobranzaRepuesto });
        comp.ngOnInit();

        expect(articuloService.query).toHaveBeenCalled();
        expect(articuloService.addArticuloToCollectionIfMissing).toHaveBeenCalledWith(articuloCollection, ...additionalArticulos);
        expect(comp.articulosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const cobranzaRepuesto: ICobranzaRepuesto = { id: 456 };
        const tipoRepuesto: ITipoRepuesto = { id: 16948 };
        cobranzaRepuesto.tipoRepuesto = tipoRepuesto;
        const articulo: IArticulo = { id: 48966 };
        cobranzaRepuesto.articulo = articulo;

        activatedRoute.data = of({ cobranzaRepuesto });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cobranzaRepuesto));
        expect(comp.tipoRepuestosSharedCollection).toContain(tipoRepuesto);
        expect(comp.articulosSharedCollection).toContain(articulo);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CobranzaRepuesto>>();
        const cobranzaRepuesto = { id: 123 };
        jest.spyOn(cobranzaRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cobranzaRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cobranzaRepuesto }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cobranzaRepuestoService.update).toHaveBeenCalledWith(cobranzaRepuesto);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CobranzaRepuesto>>();
        const cobranzaRepuesto = new CobranzaRepuesto();
        jest.spyOn(cobranzaRepuestoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cobranzaRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cobranzaRepuesto }));
        saveSubject.complete();

        // THEN
        expect(cobranzaRepuestoService.create).toHaveBeenCalledWith(cobranzaRepuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CobranzaRepuesto>>();
        const cobranzaRepuesto = { id: 123 };
        jest.spyOn(cobranzaRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cobranzaRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cobranzaRepuestoService.update).toHaveBeenCalledWith(cobranzaRepuesto);
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
