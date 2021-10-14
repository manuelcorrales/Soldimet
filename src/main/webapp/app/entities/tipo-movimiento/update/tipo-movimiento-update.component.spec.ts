jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TipoMovimientoService } from '../service/tipo-movimiento.service';
import { ITipoMovimiento, TipoMovimiento } from '../tipo-movimiento.model';

import { TipoMovimientoUpdateComponent } from './tipo-movimiento-update.component';

describe('Component Tests', () => {
  describe('TipoMovimiento Management Update Component', () => {
    let comp: TipoMovimientoUpdateComponent;
    let fixture: ComponentFixture<TipoMovimientoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let tipoMovimientoService: TipoMovimientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TipoMovimientoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TipoMovimientoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoMovimientoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      tipoMovimientoService = TestBed.inject(TipoMovimientoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const tipoMovimiento: ITipoMovimiento = { id: 456 };

        activatedRoute.data = of({ tipoMovimiento });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(tipoMovimiento));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TipoMovimiento>>();
        const tipoMovimiento = { id: 123 };
        jest.spyOn(tipoMovimientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: tipoMovimiento }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(tipoMovimientoService.update).toHaveBeenCalledWith(tipoMovimiento);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TipoMovimiento>>();
        const tipoMovimiento = new TipoMovimiento();
        jest.spyOn(tipoMovimientoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: tipoMovimiento }));
        saveSubject.complete();

        // THEN
        expect(tipoMovimientoService.create).toHaveBeenCalledWith(tipoMovimiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TipoMovimiento>>();
        const tipoMovimiento = { id: 123 };
        jest.spyOn(tipoMovimientoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoMovimiento });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(tipoMovimientoService.update).toHaveBeenCalledWith(tipoMovimiento);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
