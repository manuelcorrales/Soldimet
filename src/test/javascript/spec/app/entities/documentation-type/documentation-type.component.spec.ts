import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { DocumentationTypeComponent } from 'app/entities/documentation-type/documentation-type.component';
import { DocumentationTypeService } from 'app/entities/documentation-type/documentation-type.service';
import { DocumentationType } from 'app/shared/model/documentation-type.model';

describe('Component Tests', () => {
  describe('DocumentationType Management Component', () => {
    let comp: DocumentationTypeComponent;
    let fixture: ComponentFixture<DocumentationTypeComponent>;
    let service: DocumentationTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [DocumentationTypeComponent],
        providers: []
      })
        .overrideTemplate(DocumentationTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentationTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentationTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DocumentationType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.documentationTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
