import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BancoDetailComponent } from './banco-detail.component';

describe('Component Tests', () => {
  describe('Banco Management Detail Component', () => {
    let comp: BancoDetailComponent;
    let fixture: ComponentFixture<BancoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [BancoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ banco: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(BancoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BancoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load banco on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.banco).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
