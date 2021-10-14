jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EstadoDetallePedidoService } from '../service/estado-detalle-pedido.service';
import { IEstadoDetallePedido, EstadoDetallePedido } from '../estado-detalle-pedido.model';

import { EstadoDetallePedidoUpdateComponent } from './estado-detalle-pedido-update.component';

describe('Component Tests', () => {
  describe('EstadoDetallePedido Management Update Component', () => {
    let comp: EstadoDetallePedidoUpdateComponent;
    let fixture: ComponentFixture<EstadoDetallePedidoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let estadoDetallePedidoService: EstadoDetallePedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoDetallePedidoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EstadoDetallePedidoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoDetallePedidoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      estadoDetallePedidoService = TestBed.inject(EstadoDetallePedidoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const estadoDetallePedido: IEstadoDetallePedido = { id: 456 };

        activatedRoute.data = of({ estadoDetallePedido });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(estadoDetallePedido));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoDetallePedido>>();
        const estadoDetallePedido = { id: 123 };
        jest.spyOn(estadoDetallePedidoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoDetallePedido });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoDetallePedido }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(estadoDetallePedidoService.update).toHaveBeenCalledWith(estadoDetallePedido);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoDetallePedido>>();
        const estadoDetallePedido = new EstadoDetallePedido();
        jest.spyOn(estadoDetallePedidoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoDetallePedido });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: estadoDetallePedido }));
        saveSubject.complete();

        // THEN
        expect(estadoDetallePedidoService.create).toHaveBeenCalledWith(estadoDetallePedido);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<EstadoDetallePedido>>();
        const estadoDetallePedido = { id: 123 };
        jest.spyOn(estadoDetallePedidoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ estadoDetallePedido });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(estadoDetallePedidoService.update).toHaveBeenCalledWith(estadoDetallePedido);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
