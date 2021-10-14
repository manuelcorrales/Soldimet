jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PersonaService } from '../service/persona.service';
import { IPersona, Persona } from '../persona.model';
import { IDireccion } from 'app/entities/direccion/direccion.model';
import { DireccionService } from 'app/entities/direccion/service/direccion.service';
import { IEstadoPersona } from 'app/entities/estado-persona/estado-persona.model';
import { EstadoPersonaService } from 'app/entities/estado-persona/service/estado-persona.service';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { PersonaUpdateComponent } from './persona-update.component';

describe('Component Tests', () => {
  describe('Persona Management Update Component', () => {
    let comp: PersonaUpdateComponent;
    let fixture: ComponentFixture<PersonaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let personaService: PersonaService;
    let direccionService: DireccionService;
    let estadoPersonaService: EstadoPersonaService;
    let userService: UserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PersonaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PersonaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      personaService = TestBed.inject(PersonaService);
      direccionService = TestBed.inject(DireccionService);
      estadoPersonaService = TestBed.inject(EstadoPersonaService);
      userService = TestBed.inject(UserService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call direccion query and add missing value', () => {
        const persona: IPersona = { id: 456 };
        const direccion: IDireccion = { id: 68922 };
        persona.direccion = direccion;

        const direccionCollection: IDireccion[] = [{ id: 60225 }];
        jest.spyOn(direccionService, 'query').mockReturnValue(of(new HttpResponse({ body: direccionCollection })));
        const expectedCollection: IDireccion[] = [direccion, ...direccionCollection];
        jest.spyOn(direccionService, 'addDireccionToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ persona });
        comp.ngOnInit();

        expect(direccionService.query).toHaveBeenCalled();
        expect(direccionService.addDireccionToCollectionIfMissing).toHaveBeenCalledWith(direccionCollection, direccion);
        expect(comp.direccionsCollection).toEqual(expectedCollection);
      });

      it('Should call EstadoPersona query and add missing value', () => {
        const persona: IPersona = { id: 456 };
        const estadoPersona: IEstadoPersona = { id: 93655 };
        persona.estadoPersona = estadoPersona;

        const estadoPersonaCollection: IEstadoPersona[] = [{ id: 47038 }];
        jest.spyOn(estadoPersonaService, 'query').mockReturnValue(of(new HttpResponse({ body: estadoPersonaCollection })));
        const additionalEstadoPersonas = [estadoPersona];
        const expectedCollection: IEstadoPersona[] = [...additionalEstadoPersonas, ...estadoPersonaCollection];
        jest.spyOn(estadoPersonaService, 'addEstadoPersonaToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ persona });
        comp.ngOnInit();

        expect(estadoPersonaService.query).toHaveBeenCalled();
        expect(estadoPersonaService.addEstadoPersonaToCollectionIfMissing).toHaveBeenCalledWith(
          estadoPersonaCollection,
          ...additionalEstadoPersonas
        );
        expect(comp.estadoPersonasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call User query and add missing value', () => {
        const persona: IPersona = { id: 456 };
        const user: IUser = { id: 94710 };
        persona.user = user;

        const userCollection: IUser[] = [{ id: 34618 }];
        jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
        const additionalUsers = [user];
        const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
        jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ persona });
        comp.ngOnInit();

        expect(userService.query).toHaveBeenCalled();
        expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
        expect(comp.usersSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const persona: IPersona = { id: 456 };
        const direccion: IDireccion = { id: 84516 };
        persona.direccion = direccion;
        const estadoPersona: IEstadoPersona = { id: 453 };
        persona.estadoPersona = estadoPersona;
        const user: IUser = { id: 10867 };
        persona.user = user;

        activatedRoute.data = of({ persona });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(persona));
        expect(comp.direccionsCollection).toContain(direccion);
        expect(comp.estadoPersonasSharedCollection).toContain(estadoPersona);
        expect(comp.usersSharedCollection).toContain(user);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Persona>>();
        const persona = { id: 123 };
        jest.spyOn(personaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ persona });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: persona }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(personaService.update).toHaveBeenCalledWith(persona);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Persona>>();
        const persona = new Persona();
        jest.spyOn(personaService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ persona });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: persona }));
        saveSubject.complete();

        // THEN
        expect(personaService.create).toHaveBeenCalledWith(persona);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Persona>>();
        const persona = { id: 123 };
        jest.spyOn(personaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ persona });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(personaService.update).toHaveBeenCalledWith(persona);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackDireccionById', () => {
        it('Should return tracked Direccion primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackDireccionById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackEstadoPersonaById', () => {
        it('Should return tracked EstadoPersona primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEstadoPersonaById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackUserById', () => {
        it('Should return tracked User primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackUserById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
