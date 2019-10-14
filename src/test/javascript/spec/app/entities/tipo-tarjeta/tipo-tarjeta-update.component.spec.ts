import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { TipoTarjetaUpdateComponent } from 'app/entities/tipo-tarjeta/tipo-tarjeta-update.component';
import { TipoTarjetaService } from 'app/entities/tipo-tarjeta/tipo-tarjeta.service';
import { TipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';

describe('Component Tests', () => {
  describe('TipoTarjeta Management Update Component', () => {
    let comp: TipoTarjetaUpdateComponent;
    let fixture: ComponentFixture<TipoTarjetaUpdateComponent>;
    let service: TipoTarjetaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [TipoTarjetaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoTarjetaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoTarjetaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoTarjetaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoTarjeta(123);
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
        const entity = new TipoTarjeta();
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
