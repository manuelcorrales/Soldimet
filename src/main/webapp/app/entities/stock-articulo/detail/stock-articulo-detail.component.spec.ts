import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockArticuloDetailComponent } from './stock-articulo-detail.component';

describe('Component Tests', () => {
  describe('StockArticulo Management Detail Component', () => {
    let comp: StockArticuloDetailComponent;
    let fixture: ComponentFixture<StockArticuloDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [StockArticuloDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ stockArticulo: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(StockArticuloDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StockArticuloDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load stockArticulo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.stockArticulo).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
