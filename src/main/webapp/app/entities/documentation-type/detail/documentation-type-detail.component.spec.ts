import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DocumentationTypeDetailComponent } from './documentation-type-detail.component';

describe('Component Tests', () => {
  describe('DocumentationType Management Detail Component', () => {
    let comp: DocumentationTypeDetailComponent;
    let fixture: ComponentFixture<DocumentationTypeDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DocumentationTypeDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ documentationType: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(DocumentationTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentationTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load documentationType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.documentationType).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
