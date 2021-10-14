import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DocumentationTypeService } from '../service/documentation-type.service';

import { DocumentationTypeComponent } from './documentation-type.component';

describe('Component Tests', () => {
  describe('DocumentationType Management Component', () => {
    let comp: DocumentationTypeComponent;
    let fixture: ComponentFixture<DocumentationTypeComponent>;
    let service: DocumentationTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DocumentationTypeComponent],
      })
        .overrideTemplate(DocumentationTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentationTypeComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(DocumentationTypeService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.documentationTypes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
