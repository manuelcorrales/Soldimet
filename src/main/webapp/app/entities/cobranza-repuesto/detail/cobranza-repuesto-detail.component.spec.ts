import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CobranzaRepuestoDetailComponent } from './cobranza-repuesto-detail.component';

describe('Component Tests', () => {
  describe('CobranzaRepuesto Management Detail Component', () => {
    let comp: CobranzaRepuestoDetailComponent;
    let fixture: ComponentFixture<CobranzaRepuestoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CobranzaRepuestoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cobranzaRepuesto: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CobranzaRepuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CobranzaRepuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cobranzaRepuesto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cobranzaRepuesto).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
