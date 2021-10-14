import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CilindradaDetailComponent } from './cilindrada-detail.component';

describe('Component Tests', () => {
  describe('Cilindrada Management Detail Component', () => {
    let comp: CilindradaDetailComponent;
    let fixture: ComponentFixture<CilindradaDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CilindradaDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cilindrada: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CilindradaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CilindradaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cilindrada on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cilindrada).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
