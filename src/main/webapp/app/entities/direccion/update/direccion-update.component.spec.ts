jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DireccionService } from '../service/direccion.service';
import { IDireccion, Direccion } from '../direccion.model';
import { ILocalidad } from 'app/entities/localidad/localidad.model';
import { LocalidadService } from 'app/entities/localidad/service/localidad.service';

import { DireccionUpdateComponent } from './direccion-update.component';

describe('Component Tests', () => {
  describe('Direccion Management Update Component', () => {
    let comp: DireccionUpdateComponent;
    let fixture: ComponentFixture<DireccionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let direccionService: DireccionService;
    let localidadService: LocalidadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DireccionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DireccionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DireccionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      direccionService = TestBed.inject(DireccionService);
      localidadService = TestBed.inject(LocalidadService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Localidad query and add missing value', () => {
        const direccion: IDireccion = { id: 456 };
        const localidad: ILocalidad = { id: 43878 };
        direccion.localidad = localidad;

        const localidadCollection: ILocalidad[] = [{ id: 98261 }];
        jest.spyOn(localidadService, 'query').mockReturnValue(of(new HttpResponse({ body: localidadCollection })));
        const additionalLocalidads = [localidad];
        const expectedCollection: ILocalidad[] = [...additionalLocalidads, ...localidadCollection];
        jest.spyOn(localidadService, 'addLocalidadToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ direccion });
        comp.ngOnInit();

        expect(localidadService.query).toHaveBeenCalled();
        expect(localidadService.addLocalidadToCollectionIfMissing).toHaveBeenCalledWith(localidadCollection, ...additionalLocalidads);
        expect(comp.localidadsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const direccion: IDireccion = { id: 456 };
        const localidad: ILocalidad = { id: 33633 };
        direccion.localidad = localidad;

        activatedRoute.data = of({ direccion });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(direccion));
        expect(comp.localidadsSharedCollection).toContain(localidad);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Direccion>>();
        const direccion = { id: 123 };
        jest.spyOn(direccionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ direccion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: direccion }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(direccionService.update).toHaveBeenCalledWith(direccion);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Direccion>>();
        const direccion = new Direccion();
        jest.spyOn(direccionService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ direccion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: direccion }));
        saveSubject.complete();

        // THEN
        expect(direccionService.create).toHaveBeenCalledWith(direccion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Direccion>>();
        const direccion = { id: 123 };
        jest.spyOn(direccionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ direccion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(direccionService.update).toHaveBeenCalledWith(direccion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackLocalidadById', () => {
        it('Should return tracked Localidad primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackLocalidadById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
