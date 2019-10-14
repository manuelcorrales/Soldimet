import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MotorUpdateComponent } from 'app/entities/motor/motor-update.component';
import { MotorService } from 'app/entities/motor/motor.service';
import { Motor } from 'app/shared/model/motor.model';

describe('Component Tests', () => {
  describe('Motor Management Update Component', () => {
    let comp: MotorUpdateComponent;
    let fixture: ComponentFixture<MotorUpdateComponent>;
    let service: MotorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MotorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MotorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MotorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MotorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Motor(123);
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
        const entity = new Motor();
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
