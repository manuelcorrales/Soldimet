import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CategoriaPagoUpdateComponent } from 'app/entities/categoria-pago/categoria-pago-update.component';
import { CategoriaPagoService } from 'app/entities/categoria-pago/categoria-pago.service';
import { CategoriaPago } from 'app/shared/model/categoria-pago.model';

describe('Component Tests', () => {
  describe('CategoriaPago Management Update Component', () => {
    let comp: CategoriaPagoUpdateComponent;
    let fixture: ComponentFixture<CategoriaPagoUpdateComponent>;
    let service: CategoriaPagoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CategoriaPagoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CategoriaPagoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoriaPagoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoriaPagoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CategoriaPago(123);
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
        const entity = new CategoriaPago();
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
