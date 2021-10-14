jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DocumentationTypeService } from '../service/documentation-type.service';
import { IDocumentationType, DocumentationType } from '../documentation-type.model';

import { DocumentationTypeUpdateComponent } from './documentation-type-update.component';

describe('Component Tests', () => {
  describe('DocumentationType Management Update Component', () => {
    let comp: DocumentationTypeUpdateComponent;
    let fixture: ComponentFixture<DocumentationTypeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let documentationTypeService: DocumentationTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DocumentationTypeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DocumentationTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentationTypeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      documentationTypeService = TestBed.inject(DocumentationTypeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const documentationType: IDocumentationType = { id: 456 };

        activatedRoute.data = of({ documentationType });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(documentationType));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DocumentationType>>();
        const documentationType = { id: 123 };
        jest.spyOn(documentationTypeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ documentationType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: documentationType }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(documentationTypeService.update).toHaveBeenCalledWith(documentationType);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DocumentationType>>();
        const documentationType = new DocumentationType();
        jest.spyOn(documentationTypeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ documentationType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: documentationType }));
        saveSubject.complete();

        // THEN
        expect(documentationTypeService.create).toHaveBeenCalledWith(documentationType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<DocumentationType>>();
        const documentationType = { id: 123 };
        jest.spyOn(documentationTypeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ documentationType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(documentationTypeService.update).toHaveBeenCalledWith(documentationType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
