jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ClienteService } from '../service/cliente.service';
import { ICliente, Cliente } from '../cliente.model';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';

import { ClienteUpdateComponent } from './cliente-update.component';

describe('Component Tests', () => {
  describe('Cliente Management Update Component', () => {
    let comp: ClienteUpdateComponent;
    let fixture: ComponentFixture<ClienteUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let clienteService: ClienteService;
    let personaService: PersonaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ClienteUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ClienteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClienteUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      clienteService = TestBed.inject(ClienteService);
      personaService = TestBed.inject(PersonaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call persona query and add missing value', () => {
        const cliente: ICliente = { id: 456 };
        const persona: IPersona = { id: 73324 };
        cliente.persona = persona;

        const personaCollection: IPersona[] = [{ id: 46345 }];
        jest.spyOn(personaService, 'query').mockReturnValue(of(new HttpResponse({ body: personaCollection })));
        const expectedCollection: IPersona[] = [persona, ...personaCollection];
        jest.spyOn(personaService, 'addPersonaToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ cliente });
        comp.ngOnInit();

        expect(personaService.query).toHaveBeenCalled();
        expect(personaService.addPersonaToCollectionIfMissing).toHaveBeenCalledWith(personaCollection, persona);
        expect(comp.personasCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const cliente: ICliente = { id: 456 };
        const persona: IPersona = { id: 74904 };
        cliente.persona = persona;

        activatedRoute.data = of({ cliente });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cliente));
        expect(comp.personasCollection).toContain(persona);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Cliente>>();
        const cliente = { id: 123 };
        jest.spyOn(clienteService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cliente });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cliente }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(clienteService.update).toHaveBeenCalledWith(cliente);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Cliente>>();
        const cliente = new Cliente();
        jest.spyOn(clienteService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cliente });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cliente }));
        saveSubject.complete();

        // THEN
        expect(clienteService.create).toHaveBeenCalledWith(cliente);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Cliente>>();
        const cliente = { id: 123 };
        jest.spyOn(clienteService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cliente });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(clienteService.update).toHaveBeenCalledWith(cliente);
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
