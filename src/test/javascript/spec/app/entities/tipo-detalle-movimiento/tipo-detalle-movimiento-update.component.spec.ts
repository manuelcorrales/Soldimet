import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { TipoDetalleMovimientoUpdateComponent } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento-update.component';
import { TipoDetalleMovimientoService } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.service';
import { TipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';

describe('Component Tests', () => {
  describe('TipoDetalleMovimiento Management Update Component', () => {
    let comp: TipoDetalleMovimientoUpdateComponent;
    let fixture: ComponentFixture<TipoDetalleMovimientoUpdateComponent>;
    let service: TipoDetalleMovimientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [TipoDetalleMovimientoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoDetalleMovimientoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoDetalleMovimientoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoDetalleMovimientoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoDetalleMovimiento(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoDetalleMovimiento();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
