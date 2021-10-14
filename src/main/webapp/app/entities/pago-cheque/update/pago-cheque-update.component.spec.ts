jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PagoChequeService } from '../service/pago-cheque.service';
import { IPagoCheque, PagoCheque } from '../pago-cheque.model';
import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/service/forma-de-pago.service';
import { IBanco } from 'app/entities/banco/banco.model';
import { BancoService } from 'app/entities/banco/service/banco.service';

import { PagoChequeUpdateComponent } from './pago-cheque-update.component';

describe('Component Tests', () => {
  describe('PagoCheque Management Update Component', () => {
    let comp: PagoChequeUpdateComponent;
    let fixture: ComponentFixture<PagoChequeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let pagoChequeService: PagoChequeService;
    let formaDePagoService: FormaDePagoService;
    let bancoService: BancoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PagoChequeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PagoChequeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagoChequeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      pagoChequeService = TestBed.inject(PagoChequeService);
      formaDePagoService = TestBed.inject(FormaDePagoService);
      bancoService = TestBed.inject(BancoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call formaDePago query and add missing value', () => {
        const pagoCheque: IPagoCheque = { id: 456 };
        const formaDePago: IFormaDePago = { id: 63614 };
        pagoCheque.formaDePago = formaDePago;

        const formaDePagoCollection: IFormaDePago[] = [{ id: 73636 }];
        jest.spyOn(formaDePagoService, 'query').mockReturnValue(of(new HttpResponse({ body: formaDePagoCollection })));
        const expectedCollection: IFormaDePago[] = [formaDePago, ...formaDePagoCollection];
        jest.spyOn(formaDePagoService, 'addFormaDePagoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ pagoCheque });
        comp.ngOnInit();

        expect(formaDePagoService.query).toHaveBeenCalled();
        expect(formaDePagoService.addFormaDePagoToCollectionIfMissing).toHaveBeenCalledWith(formaDePagoCollection, formaDePago);
        expect(comp.formaDePagosCollection).toEqual(expectedCollection);
      });

      it('Should call Banco query and add missing value', () => {
        const pagoCheque: IPagoCheque = { id: 456 };
        const banco: IBanco = { id: 49201 };
        pagoCheque.banco = banco;

        const bancoCollection: IBanco[] = [{ id: 8287 }];
        jest.spyOn(bancoService, 'query').mockReturnValue(of(new HttpResponse({ body: bancoCollection })));
        const additionalBancos = [banco];
        const expectedCollection: IBanco[] = [...additionalBancos, ...bancoCollection];
        jest.spyOn(bancoService, 'addBancoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ pagoCheque });
        comp.ngOnInit();

        expect(bancoService.query).toHaveBeenCalled();
        expect(bancoService.addBancoToCollectionIfMissing).toHaveBeenCalledWith(bancoCollection, ...additionalBancos);
        expect(comp.bancosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const pagoCheque: IPagoCheque = { id: 456 };
        const formaDePago: IFormaDePago = { id: 1915 };
        pagoCheque.formaDePago = formaDePago;
        const banco: IBanco = { id: 79784 };
        pagoCheque.banco = banco;

        activatedRoute.data = of({ pagoCheque });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(pagoCheque));
        expect(comp.formaDePagosCollection).toContain(formaDePago);
        expect(comp.bancosSharedCollection).toContain(banco);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PagoCheque>>();
        const pagoCheque = { id: 123 };
        jest.spyOn(pagoChequeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ pagoCheque });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pagoCheque }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(pagoChequeService.update).toHaveBeenCalledWith(pagoCheque);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PagoCheque>>();
        const pagoCheque = new PagoCheque();
        jest.spyOn(pagoChequeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ pagoCheque });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pagoCheque }));
        saveSubject.complete();

        // THEN
        expect(pagoChequeService.create).toHaveBeenCalledWith(pagoCheque);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PagoCheque>>();
        const pagoCheque = { id: 123 };
        jest.spyOn(pagoChequeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ pagoCheque });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(pagoChequeService.update).toHaveBeenCalledWith(pagoCheque);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackFormaDePagoById', () => {
        it('Should return tracked FormaDePago primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackFormaDePagoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

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
