jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MedioDePagoService } from '../service/medio-de-pago.service';
import { IMedioDePago, MedioDePago } from '../medio-de-pago.model';
import { IMedioDePagoCheque } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.model';
import { MedioDePagoChequeService } from 'app/entities/medio-de-pago-cheque/service/medio-de-pago-cheque.service';
import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/service/forma-de-pago.service';

import { MedioDePagoUpdateComponent } from './medio-de-pago-update.component';

describe('Component Tests', () => {
  describe('MedioDePago Management Update Component', () => {
    let comp: MedioDePagoUpdateComponent;
    let fixture: ComponentFixture<MedioDePagoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let medioDePagoService: MedioDePagoService;
    let medioDePagoChequeService: MedioDePagoChequeService;
    let formaDePagoService: FormaDePagoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MedioDePagoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MedioDePagoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedioDePagoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      medioDePagoService = TestBed.inject(MedioDePagoService);
      medioDePagoChequeService = TestBed.inject(MedioDePagoChequeService);
      formaDePagoService = TestBed.inject(FormaDePagoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call medioDePagoCheque query and add missing value', () => {
        const medioDePago: IMedioDePago = { id: 456 };
        const medioDePagoCheque: IMedioDePagoCheque = { id: 53092 };
        medioDePago.medioDePagoCheque = medioDePagoCheque;

        const medioDePagoChequeCollection: IMedioDePagoCheque[] = [{ id: 63520 }];
        jest.spyOn(medioDePagoChequeService, 'query').mockReturnValue(of(new HttpResponse({ body: medioDePagoChequeCollection })));
        const expectedCollection: IMedioDePagoCheque[] = [medioDePagoCheque, ...medioDePagoChequeCollection];
        jest.spyOn(medioDePagoChequeService, 'addMedioDePagoChequeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ medioDePago });
        comp.ngOnInit();

        expect(medioDePagoChequeService.query).toHaveBeenCalled();
        expect(medioDePagoChequeService.addMedioDePagoChequeToCollectionIfMissing).toHaveBeenCalledWith(
          medioDePagoChequeCollection,
          medioDePagoCheque
        );
        expect(comp.medioDePagoChequesCollection).toEqual(expectedCollection);
      });

      it('Should call FormaDePago query and add missing value', () => {
        const medioDePago: IMedioDePago = { id: 456 };
        const formaDePago: IFormaDePago = { id: 14945 };
        medioDePago.formaDePago = formaDePago;

        const formaDePagoCollection: IFormaDePago[] = [{ id: 16470 }];
        jest.spyOn(formaDePagoService, 'query').mockReturnValue(of(new HttpResponse({ body: formaDePagoCollection })));
        const additionalFormaDePagos = [formaDePago];
        const expectedCollection: IFormaDePago[] = [...additionalFormaDePagos, ...formaDePagoCollection];
        jest.spyOn(formaDePagoService, 'addFormaDePagoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ medioDePago });
        comp.ngOnInit();

        expect(formaDePagoService.query).toHaveBeenCalled();
        expect(formaDePagoService.addFormaDePagoToCollectionIfMissing).toHaveBeenCalledWith(
          formaDePagoCollection,
          ...additionalFormaDePagos
        );
        expect(comp.formaDePagosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const medioDePago: IMedioDePago = { id: 456 };
        const medioDePagoCheque: IMedioDePagoCheque = { id: 17896 };
        medioDePago.medioDePagoCheque = medioDePagoCheque;
        const formaDePago: IFormaDePago = { id: 46309 };
        medioDePago.formaDePago = formaDePago;

        activatedRoute.data = of({ medioDePago });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(medioDePago));
        expect(comp.medioDePagoChequesCollection).toContain(medioDePagoCheque);
        expect(comp.formaDePagosSharedCollection).toContain(formaDePago);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MedioDePago>>();
        const medioDePago = { id: 123 };
        jest.spyOn(medioDePagoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ medioDePago });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: medioDePago }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(medioDePagoService.update).toHaveBeenCalledWith(medioDePago);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MedioDePago>>();
        const medioDePago = new MedioDePago();
        jest.spyOn(medioDePagoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ medioDePago });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: medioDePago }));
        saveSubject.complete();

        // THEN
        expect(medioDePagoService.create).toHaveBeenCalledWith(medioDePago);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MedioDePago>>();
        const medioDePago = { id: 123 };
        jest.spyOn(medioDePagoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ medioDePago });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(medioDePagoService.update).toHaveBeenCalledWith(medioDePago);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackMedioDePagoChequeById', () => {
        it('Should return tracked MedioDePagoCheque primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMedioDePagoChequeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackFormaDePagoById', () => {
        it('Should return tracked FormaDePago primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackFormaDePagoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
