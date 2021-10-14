jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PagoTarjetaService } from '../service/pago-tarjeta.service';
import { IPagoTarjeta, PagoTarjeta } from '../pago-tarjeta.model';
import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/service/forma-de-pago.service';

import { PagoTarjetaUpdateComponent } from './pago-tarjeta-update.component';

describe('Component Tests', () => {
  describe('PagoTarjeta Management Update Component', () => {
    let comp: PagoTarjetaUpdateComponent;
    let fixture: ComponentFixture<PagoTarjetaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let pagoTarjetaService: PagoTarjetaService;
    let formaDePagoService: FormaDePagoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PagoTarjetaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PagoTarjetaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagoTarjetaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      pagoTarjetaService = TestBed.inject(PagoTarjetaService);
      formaDePagoService = TestBed.inject(FormaDePagoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call formaDePago query and add missing value', () => {
        const pagoTarjeta: IPagoTarjeta = { id: 456 };
        const formaDePago: IFormaDePago = { id: 556 };
        pagoTarjeta.formaDePago = formaDePago;

        const formaDePagoCollection: IFormaDePago[] = [{ id: 82931 }];
        jest.spyOn(formaDePagoService, 'query').mockReturnValue(of(new HttpResponse({ body: formaDePagoCollection })));
        const expectedCollection: IFormaDePago[] = [formaDePago, ...formaDePagoCollection];
        jest.spyOn(formaDePagoService, 'addFormaDePagoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ pagoTarjeta });
        comp.ngOnInit();

        expect(formaDePagoService.query).toHaveBeenCalled();
        expect(formaDePagoService.addFormaDePagoToCollectionIfMissing).toHaveBeenCalledWith(formaDePagoCollection, formaDePago);
        expect(comp.formaDePagosCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const pagoTarjeta: IPagoTarjeta = { id: 456 };
        const formaDePago: IFormaDePago = { id: 70810 };
        pagoTarjeta.formaDePago = formaDePago;

        activatedRoute.data = of({ pagoTarjeta });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(pagoTarjeta));
        expect(comp.formaDePagosCollection).toContain(formaDePago);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PagoTarjeta>>();
        const pagoTarjeta = { id: 123 };
        jest.spyOn(pagoTarjetaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ pagoTarjeta });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pagoTarjeta }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(pagoTarjetaService.update).toHaveBeenCalledWith(pagoTarjeta);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PagoTarjeta>>();
        const pagoTarjeta = new PagoTarjeta();
        jest.spyOn(pagoTarjetaService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ pagoTarjeta });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pagoTarjeta }));
        saveSubject.complete();

        // THEN
        expect(pagoTarjetaService.create).toHaveBeenCalledWith(pagoTarjeta);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PagoTarjeta>>();
        const pagoTarjeta = { id: 123 };
        jest.spyOn(pagoTarjetaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ pagoTarjeta });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(pagoTarjetaService.update).toHaveBeenCalledWith(pagoTarjeta);
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
    });
  });
});
