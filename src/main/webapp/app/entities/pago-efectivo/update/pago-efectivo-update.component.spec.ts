jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PagoEfectivoService } from '../service/pago-efectivo.service';
import { IPagoEfectivo, PagoEfectivo } from '../pago-efectivo.model';
import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/service/forma-de-pago.service';

import { PagoEfectivoUpdateComponent } from './pago-efectivo-update.component';

describe('Component Tests', () => {
  describe('PagoEfectivo Management Update Component', () => {
    let comp: PagoEfectivoUpdateComponent;
    let fixture: ComponentFixture<PagoEfectivoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let pagoEfectivoService: PagoEfectivoService;
    let formaDePagoService: FormaDePagoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PagoEfectivoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PagoEfectivoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagoEfectivoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      pagoEfectivoService = TestBed.inject(PagoEfectivoService);
      formaDePagoService = TestBed.inject(FormaDePagoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call formaDePago query and add missing value', () => {
        const pagoEfectivo: IPagoEfectivo = { id: 456 };
        const formaDePago: IFormaDePago = { id: 58920 };
        pagoEfectivo.formaDePago = formaDePago;

        const formaDePagoCollection: IFormaDePago[] = [{ id: 45393 }];
        jest.spyOn(formaDePagoService, 'query').mockReturnValue(of(new HttpResponse({ body: formaDePagoCollection })));
        const expectedCollection: IFormaDePago[] = [formaDePago, ...formaDePagoCollection];
        jest.spyOn(formaDePagoService, 'addFormaDePagoToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ pagoEfectivo });
        comp.ngOnInit();

        expect(formaDePagoService.query).toHaveBeenCalled();
        expect(formaDePagoService.addFormaDePagoToCollectionIfMissing).toHaveBeenCalledWith(formaDePagoCollection, formaDePago);
        expect(comp.formaDePagosCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const pagoEfectivo: IPagoEfectivo = { id: 456 };
        const formaDePago: IFormaDePago = { id: 60606 };
        pagoEfectivo.formaDePago = formaDePago;

        activatedRoute.data = of({ pagoEfectivo });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(pagoEfectivo));
        expect(comp.formaDePagosCollection).toContain(formaDePago);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PagoEfectivo>>();
        const pagoEfectivo = { id: 123 };
        jest.spyOn(pagoEfectivoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ pagoEfectivo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pagoEfectivo }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(pagoEfectivoService.update).toHaveBeenCalledWith(pagoEfectivo);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PagoEfectivo>>();
        const pagoEfectivo = new PagoEfectivo();
        jest.spyOn(pagoEfectivoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ pagoEfectivo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pagoEfectivo }));
        saveSubject.complete();

        // THEN
        expect(pagoEfectivoService.create).toHaveBeenCalledWith(pagoEfectivo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PagoEfectivo>>();
        const pagoEfectivo = { id: 123 };
        jest.spyOn(pagoEfectivoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ pagoEfectivo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(pagoEfectivoService.update).toHaveBeenCalledWith(pagoEfectivo);
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
