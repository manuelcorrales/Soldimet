jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EstadoPedidoRepuestoService } from '../service/estado-pedido-repuesto.service';
import { IEstadoPedidoRepuesto, EstadoPedidoRepuesto } from '../estado-pedido-repuesto.model';

import { EstadoPedidoRepuestoUpdateComponent } from './estado-pedido-repuesto-update.component';

describe('Component Tests', () => {
  describe('EstadoPedidoRepuesto Management Update Component', () => {
    let comp: EstadoPedidoRepuestoUpdateComponent;
    let fixture: ComponentFixture<EstadoPedidoRepuestoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let estadoPedidoRepuestoService: EstadoPedidoRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoPedidoRepuestoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EstadoPedidoRepuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoPedidoRepuestoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      estadoPedidoRepuestoService = TestBed.inject(EstadoPedidoRepuestoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const estadoPedidoRepuesto: IEstadoPedidoRepuesto = { id: 456 };

        activatedRoute.data = of({ estadoPedidoRepuesto });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(estadoPedidoRepuesto));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoPedidoRepuesto>>();
        const estadoPedidoRepuesto = { id: 123 };
        jest.spyOn(estadoPedidoRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoPedidoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoPedidoRepuesto }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(estadoPedidoRepuestoService.update).toHaveBeenCalledWith(estadoPedidoRepuesto);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoPedidoRepuesto>>();
        const estadoPedidoRepuesto = new EstadoPedidoRepuesto();
        jest.spyOn(estadoPedidoRepuestoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoPedidoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoPedidoRepuesto }));
        saveSubject.complete();

        // THEN
        expect(estadoPedidoRepuestoService.create).toHaveBeenCalledWith(estadoPedidoRepuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoPedidoRepuesto>>();
        const estadoPedidoRepuesto = { id: 123 };
        jest.spyOn(estadoPedidoRepuestoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoPedidoRepuesto });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(estadoPedidoRepuestoService.update).toHaveBeenCalledWith(estadoPedidoRepuesto);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
