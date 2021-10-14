import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CobranzaOperacionDetailComponent } from './cobranza-operacion-detail.component';

describe('Component Tests', () => {
  describe('CobranzaOperacion Management Detail Component', () => {
    let comp: CobranzaOperacionDetailComponent;
    let fixture: ComponentFixture<CobranzaOperacionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CobranzaOperacionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cobranzaOperacion: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CobranzaOperacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CobranzaOperacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cobranzaOperacion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cobranzaOperacion).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
