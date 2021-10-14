jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EmpleadoService } from '../service/empleado.service';
import { IEmpleado, Empleado } from '../empleado.model';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/service/sucursal.service';

import { EmpleadoUpdateComponent } from './empleado-update.component';

describe('Component Tests', () => {
  describe('Empleado Management Update Component', () => {
    let comp: EmpleadoUpdateComponent;
    let fixture: ComponentFixture<EmpleadoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let empleadoService: EmpleadoService;
    let personaService: PersonaService;
    let sucursalService: SucursalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EmpleadoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EmpleadoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmpleadoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      empleadoService = TestBed.inject(EmpleadoService);
      personaService = TestBed.inject(PersonaService);
      sucursalService = TestBed.inject(SucursalService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call persona query and add missing value', () => {
        const empleado: IEmpleado = { id: 456 };
        const persona: IPersona = { id: 30079 };
        empleado.persona = persona;

        const personaCollection: IPersona[] = [{ id: 4338 }];
        jest.spyOn(personaService, 'query').mockReturnValue(of(new HttpResponse({ body: personaCollection })));
        const expectedCollection: IPersona[] = [persona, ...personaCollection];
        jest.spyOn(personaService, 'addPersonaToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ empleado });
        comp.ngOnInit();

        expect(personaService.query).toHaveBeenCalled();
        expect(personaService.addPersonaToCollectionIfMissing).toHaveBeenCalledWith(personaCollection, persona);
        expect(comp.personasCollection).toEqual(expectedCollection);
      });

      it('Should call Sucursal query and add missing value', () => {
        const empleado: IEmpleado = { id: 456 };
        const sucursal: ISucursal = { id: 93925 };
        empleado.sucursal = sucursal;

        const sucursalCollection: ISucursal[] = [{ id: 6958 }];
        jest.spyOn(sucursalService, 'query').mockReturnValue(of(new HttpResponse({ body: sucursalCollection })));
        const additionalSucursals = [sucursal];
        const expectedCollection: ISucursal[] = [...additionalSucursals, ...sucursalCollection];
        jest.spyOn(sucursalService, 'addSucursalToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ empleado });
        comp.ngOnInit();

        expect(sucursalService.query).toHaveBeenCalled();
        expect(sucursalService.addSucursalToCollectionIfMissing).toHaveBeenCalledWith(sucursalCollection, ...additionalSucursals);
        expect(comp.sucursalsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const empleado: IEmpleado = { id: 456 };
        const persona: IPersona = { id: 75237 };
        empleado.persona = persona;
        const sucursal: ISucursal = { id: 42035 };
        empleado.sucursal = sucursal;

        activatedRoute.data = of({ empleado });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(empleado));
        expect(comp.personasCollection).toContain(persona);
        expect(comp.sucursalsSharedCollection).toContain(sucursal);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Empleado>>();
        const empleado = { id: 123 };
        jest.spyOn(empleadoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ empleado });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: empleado }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(empleadoService.update).toHaveBeenCalledWith(empleado);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Empleado>>();
        const empleado = new Empleado();
        jest.spyOn(empleadoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ empleado });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: empleado }));
        saveSubject.complete();

        // THEN
        expect(empleadoService.create).toHaveBeenCalledWith(empleado);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Empleado>>();
        const empleado = { id: 123 };
        jest.spyOn(empleadoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ empleado });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(empleadoService.update).toHaveBeenCalledWith(empleado);
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
