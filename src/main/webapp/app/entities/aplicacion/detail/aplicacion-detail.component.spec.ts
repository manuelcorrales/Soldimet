import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AplicacionDetailComponent } from './aplicacion-detail.component';

describe('Component Tests', () => {
  describe('Aplicacion Management Detail Component', () => {
    let comp: AplicacionDetailComponent;
    let fixture: ComponentFixture<AplicacionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [AplicacionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ aplicacion: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(AplicacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AplicacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load aplicacion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.aplicacion).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
