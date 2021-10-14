jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TipoDetalleMovimientoService } from '../service/tipo-detalle-movimiento.service';
import { ITipoDetalleMovimiento, TipoDetalleMovimiento } from '../tipo-detalle-movimiento.model';

import { TipoDetalleMovimientoUpdateComponent } from './tipo-detalle-movimiento-update.component';

describe('Component Tests', () => {
  describe('TipoDetalleMovimiento Management Update Component', () => {
    let comp: TipoDetalleMovimientoUpdateComponent;
    let fixture: ComponentFixture<TipoDetalleMovimientoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let tipoDetalleMovimientoService: TipoDetalleMovimientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TipoDetalleMovimientoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TipoDetalleMovimientoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoDetalleMovimientoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      tipoDetalleMovimientoService = TestBed.inject(TipoDetalleMovimientoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const tipoDetalleMovimiento: ITipoDetalleMovimiento = { id: 456 };

        activatedRoute.data = of({ tipoDetalleMovimiento });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(tipoDetalleMovimiento));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TipoDetalleMovimiento>>();
        const tipoDetalleMovimiento = { id: 123 };
        jest.spyOn(tipoDetalleMovimientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoDetalleMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: tipoDetalleMovimiento }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(tipoDetalleMovimientoService.update).toHaveBeenCalledWith(tipoDetalleMovimiento);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TipoDetalleMovimiento>>();
        const tipoDetalleMovimiento = new TipoDetalleMovimiento();
        jest.spyOn(tipoDetalleMovimientoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoDetalleMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: tipoDetalleMovimiento }));
        saveSubject.complete();

        // THEN
        expect(tipoDetalleMovimientoService.create).toHaveBeenCalledWith(tipoDetalleMovimiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TipoDetalleMovimiento>>();
        const tipoDetalleMovimiento = { id: 123 };
        jest.spyOn(tipoDetalleMovimientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoDetalleMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(tipoDetalleMovimientoService.update).toHaveBeenCalledWith(tipoDetalleMovimiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
