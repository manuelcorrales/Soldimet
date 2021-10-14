import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RubroDetailComponent } from './rubro-detail.component';

describe('Component Tests', () => {
  describe('Rubro Management Detail Component', () => {
    let comp: RubroDetailComponent;
    let fixture: ComponentFixture<RubroDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [RubroDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ rubro: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(RubroDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RubroDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load rubro on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rubro).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
