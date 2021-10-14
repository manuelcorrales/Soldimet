jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SucursalService } from '../service/sucursal.service';
import { ISucursal, Sucursal } from '../sucursal.model';

import { SucursalUpdateComponent } from './sucursal-update.component';

describe('Component Tests', () => {
  describe('Sucursal Management Update Component', () => {
    let comp: SucursalUpdateComponent;
    let fixture: ComponentFixture<SucursalUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let sucursalService: SucursalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SucursalUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SucursalUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SucursalUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      sucursalService = TestBed.inject(SucursalService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const sucursal: ISucursal = { id: 456 };

        activatedRoute.data = of({ sucursal });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(sucursal));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Sucursal>>();
        const sucursal = { id: 123 };
        jest.spyOn(sucursalService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ sucursal });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: sucursal }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(sucursalService.update).toHaveBeenCalledWith(sucursal);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Sucursal>>();
        const sucursal = new Sucursal();
        jest.spyOn(sucursalService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ sucursal });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: sucursal }));
        saveSubject.complete();

        // THEN
        expect(sucursalService.create).toHaveBeenCalledWith(sucursal);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Sucursal>>();
        const sucursal = { id: 123 };
        jest.spyOn(sucursalService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ sucursal });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(sucursalService.update).toHaveBeenCalledWith(sucursal);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
