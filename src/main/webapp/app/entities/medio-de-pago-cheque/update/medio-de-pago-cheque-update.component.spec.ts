jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MedioDePagoChequeService } from '../service/medio-de-pago-cheque.service';
import { IMedioDePagoCheque, MedioDePagoCheque } from '../medio-de-pago-cheque.model';
import { IBanco } from 'app/entities/banco/banco.model';
import { BancoService } from 'app/entities/banco/service/banco.service';

import { MedioDePagoChequeUpdateComponent } from './medio-de-pago-cheque-update.component';

describe('Component Tests', () => {
  describe('MedioDePagoCheque Management Update Component', () => {
    let comp: MedioDePagoChequeUpdateComponent;
    let fixture: ComponentFixture<MedioDePagoChequeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let medioDePagoChequeService: MedioDePagoChequeService;
    let bancoService: BancoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MedioDePagoChequeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MedioDePagoChequeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedioDePagoChequeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      medioDePagoChequeService = TestBed.inject(MedioDePagoChequeService);
      bancoService = TestBed.inject(BancoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Banco query and add missing value', () => {
        const medioDePagoCheque: IMedioDePagoCheque = { id: 456 };
        const banco: IBanco = { id: 47580 };
        medioDePagoCheque.banco = banco;

        const bancoCollection: IBanco[] = [{ id: 7787 }];
        jest.spyOn(bancoService, 'query').mockReturnValue(of(new HttpResponse({ body: bancoCollection })));
        const additionalBancos = [banco];
        const expectedCollection: IBanco[] = [...additionalBancos, ...bancoCollection];
        jest.spyOn(bancoService, 'addBancoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ medioDePagoCheque });
        comp.ngOnInit();

        expect(bancoService.query).toHaveBeenCalled();
        expect(bancoService.addBancoToCollectionIfMissing).toHaveBeenCalledWith(bancoCollection, ...additionalBancos);
        expect(comp.bancosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const medioDePagoCheque: IMedioDePagoCheque = { id: 456 };
        const banco: IBanco = { id: 78600 };
        medioDePagoCheque.banco = banco;

        activatedRoute.data = of({ medioDePagoCheque });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(medioDePagoCheque));
        expect(comp.bancosSharedCollection).toContain(banco);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MedioDePagoCheque>>();
        const medioDePagoCheque = { id: 123 };
        jest.spyOn(medioDePagoChequeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ medioDePagoCheque });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: medioDePagoCheque }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(medioDePagoChequeService.update).toHaveBeenCalledWith(medioDePagoCheque);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MedioDePagoCheque>>();
        const medioDePagoCheque = new MedioDePagoCheque();
        jest.spyOn(medioDePagoChequeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ medioDePagoCheque });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: medioDePagoCheque }));
        saveSubject.complete();

        // THEN
        expect(medioDePagoChequeService.create).toHaveBeenCalledWith(medioDePagoCheque);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MedioDePagoCheque>>();
        const medioDePagoCheque = { id: 123 };
        jest.spyOn(medioDePagoChequeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ medioDePagoCheque });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(medioDePagoChequeService.update).toHaveBeenCalledWith(medioDePagoCheque);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackBancoById', () => {
        it('Should return tracked Banco primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackBancoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
