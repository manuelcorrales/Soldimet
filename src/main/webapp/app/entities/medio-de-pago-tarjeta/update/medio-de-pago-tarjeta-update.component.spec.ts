jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MedioDePagoTarjetaService } from '../service/medio-de-pago-tarjeta.service';
import { IMedioDePagoTarjeta, MedioDePagoTarjeta } from '../medio-de-pago-tarjeta.model';

import { MedioDePagoTarjetaUpdateComponent } from './medio-de-pago-tarjeta-update.component';

describe('Component Tests', () => {
  describe('MedioDePagoTarjeta Management Update Component', () => {
    let comp: MedioDePagoTarjetaUpdateComponent;
    let fixture: ComponentFixture<MedioDePagoTarjetaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let medioDePagoTarjetaService: MedioDePagoTarjetaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MedioDePagoTarjetaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MedioDePagoTarjetaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedioDePagoTarjetaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      medioDePagoTarjetaService = TestBed.inject(MedioDePagoTarjetaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const medioDePagoTarjeta: IMedioDePagoTarjeta = { id: 456 };

        activatedRoute.data = of({ medioDePagoTarjeta });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(medioDePagoTarjeta));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MedioDePagoTarjeta>>();
        const medioDePagoTarjeta = { id: 123 };
        jest.spyOn(medioDePagoTarjetaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ medioDePagoTarjeta });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: medioDePagoTarjeta }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(medioDePagoTarjetaService.update).toHaveBeenCalledWith(medioDePagoTarjeta);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MedioDePagoTarjeta>>();
        const medioDePagoTarjeta = new MedioDePagoTarjeta();
        jest.spyOn(medioDePagoTarjetaService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ medioDePagoTarjeta });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: medioDePagoTarjeta }));
        saveSubject.complete();

        // THEN
        expect(medioDePagoTarjetaService.create).toHaveBeenCalledWith(medioDePagoTarjeta);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MedioDePagoTarjeta>>();
        const medioDePagoTarjeta = { id: 123 };
        jest.spyOn(medioDePagoTarjetaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ medioDePagoTarjeta });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(medioDePagoTarjetaService.update).toHaveBeenCalledWith(medioDePagoTarjeta);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
