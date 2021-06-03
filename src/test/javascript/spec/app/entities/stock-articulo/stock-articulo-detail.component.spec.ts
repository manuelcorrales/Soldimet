import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { StockArticuloDetailComponent } from 'app/entities/stock-articulo/stock-articulo-detail.component';
import { StockArticulo } from 'app/shared/model/stock-articulo.model';

describe('Component Tests', () => {
  describe('StockArticulo Management Detail Component', () => {
    let comp: StockArticuloDetailComponent;
    let fixture: ComponentFixture<StockArticuloDetailComponent>;
    const route = ({ data: of({ stockArticulo: new StockArticulo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [StockArticuloDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StockArticuloDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StockArticuloDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.stockArticulo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
