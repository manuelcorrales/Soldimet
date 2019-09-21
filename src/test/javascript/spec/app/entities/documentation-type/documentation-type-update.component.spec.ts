import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { DocumentationTypeUpdateComponent } from 'app/entities/documentation-type/documentation-type-update.component';
import { DocumentationTypeService } from 'app/entities/documentation-type/documentation-type.service';
import { DocumentationType } from 'app/shared/model/documentation-type.model';

describe('Component Tests', () => {
  describe('DocumentationType Management Update Component', () => {
    let comp: DocumentationTypeUpdateComponent;
    let fixture: ComponentFixture<DocumentationTypeUpdateComponent>;
    let service: DocumentationTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [DocumentationTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DocumentationTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentationTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentationTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DocumentationType(123);
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
        const entity = new DocumentationType();
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
