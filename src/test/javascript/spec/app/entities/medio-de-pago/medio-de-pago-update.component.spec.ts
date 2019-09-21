import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MedioDePagoUpdateComponent } from 'app/entities/medio-de-pago/medio-de-pago-update.component';
import { MedioDePagoService } from 'app/entities/medio-de-pago/medio-de-pago.service';
import { MedioDePago } from 'app/shared/model/medio-de-pago.model';

describe('Component Tests', () => {
  describe('MedioDePago Management Update Component', () => {
    let comp: MedioDePagoUpdateComponent;
    let fixture: ComponentFixture<MedioDePagoUpdateComponent>;
    let service: MedioDePagoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MedioDePagoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MedioDePagoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedioDePagoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedioDePagoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MedioDePago(123);
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
        const entity = new MedioDePago();
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
