jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CajaService } from '../service/caja.service';
import { ICaja, Caja } from '../caja.model';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/service/sucursal.service';

import { CajaUpdateComponent } from './caja-update.component';

describe('Component Tests', () => {
  describe('Caja Management Update Component', () => {
    let comp: CajaUpdateComponent;
    let fixture: ComponentFixture<CajaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cajaService: CajaService;
    let sucursalService: SucursalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CajaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CajaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CajaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cajaService = TestBed.inject(CajaService);
      sucursalService = TestBed.inject(SucursalService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Sucursal query and add missing value', () => {
        const caja: ICaja = { id: 456 };
        const sucursal: ISucursal = { id: 82077 };
        caja.sucursal = sucursal;

        const sucursalCollection: ISucursal[] = [{ id: 75620 }];
        jest.spyOn(sucursalService, 'query').mockReturnValue(of(new HttpResponse({ body: sucursalCollection })));
        const additionalSucursals = [sucursal];
        const expectedCollection: ISucursal[] = [...additionalSucursals, ...sucursalCollection];
        jest.spyOn(sucursalService, 'addSucursalToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ caja });
        comp.ngOnInit();

        expect(sucursalService.query).toHaveBeenCalled();
        expect(sucursalService.addSucursalToCollectionIfMissing).toHaveBeenCalledWith(sucursalCollection, ...additionalSucursals);
        expect(comp.sucursalsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const caja: ICaja = { id: 456 };
        const sucursal: ISucursal = { id: 44915 };
        caja.sucursal = sucursal;

        activatedRoute.data = of({ caja });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(caja));
        expect(comp.sucursalsSharedCollection).toContain(sucursal);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Caja>>();
        const caja = { id: 123 };
        jest.spyOn(cajaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ caja });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: caja }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cajaService.update).toHaveBeenCalledWith(caja);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Caja>>();
        const caja = new Caja();
        jest.spyOn(cajaService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ caja });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: caja }));
        saveSubject.complete();

        // THEN
        expect(cajaService.create).toHaveBeenCalledWith(caja);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Caja>>();
        const caja = { id: 123 };
        jest.spyOn(cajaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ caja });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cajaService.update).toHaveBeenCalledWith(caja);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
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
