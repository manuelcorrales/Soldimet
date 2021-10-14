import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CategoriaPagoDetailComponent } from './categoria-pago-detail.component';

describe('Component Tests', () => {
  describe('CategoriaPago Management Detail Component', () => {
    let comp: CategoriaPagoDetailComponent;
    let fixture: ComponentFixture<CategoriaPagoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CategoriaPagoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ categoriaPago: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CategoriaPagoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CategoriaPagoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load categoriaPago on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.categoriaPago).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
