jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ProveedorService } from '../service/proveedor.service';
import { IProveedor, Proveedor } from '../proveedor.model';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';

import { ProveedorUpdateComponent } from './proveedor-update.component';

describe('Component Tests', () => {
  describe('Proveedor Management Update Component', () => {
    let comp: ProveedorUpdateComponent;
    let fixture: ComponentFixture<ProveedorUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let proveedorService: ProveedorService;
    let personaService: PersonaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProveedorUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ProveedorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProveedorUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      proveedorService = TestBed.inject(ProveedorService);
      personaService = TestBed.inject(PersonaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call persona query and add missing value', () => {
        const proveedor: IProveedor = { id: 456 };
        const persona: IPersona = { id: 45617 };
        proveedor.persona = persona;

        const personaCollection: IPersona[] = [{ id: 81281 }];
        jest.spyOn(personaService, 'query').mockReturnValue(of(new HttpResponse({ body: personaCollection })));
        const expectedCollection: IPersona[] = [persona, ...personaCollection];
        jest.spyOn(personaService, 'addPersonaToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ proveedor });
        comp.ngOnInit();

        expect(personaService.query).toHaveBeenCalled();
        expect(personaService.addPersonaToCollectionIfMissing).toHaveBeenCalledWith(personaCollection, persona);
        expect(comp.personasCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const proveedor: IProveedor = { id: 456 };
        const persona: IPersona = { id: 71974 };
        proveedor.persona = persona;

        activatedRoute.data = of({ proveedor });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(proveedor));
        expect(comp.personasCollection).toContain(persona);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Proveedor>>();
        const proveedor = { id: 123 };
        jest.spyOn(proveedorService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ proveedor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: proveedor }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(proveedorService.update).toHaveBeenCalledWith(proveedor);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Proveedor>>();
        const proveedor = new Proveedor();
        jest.spyOn(proveedorService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ proveedor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: proveedor }));
        saveSubject.complete();

        // THEN
        expect(proveedorService.create).toHaveBeenCalledWith(proveedor);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Proveedor>>();
        const proveedor = { id: 123 };
        jest.spyOn(proveedorService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ proveedor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(proveedorService.update).toHaveBeenCalledWith(proveedor);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackPersonaById', () => {
        it('Should return tracked Persona primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackPersonaById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
