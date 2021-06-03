import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { StockArticuloComponent } from 'app/entities/stock-articulo/stock-articulo.component';
import { StockArticuloService } from 'app/entities/stock-articulo/stock-articulo.service';
import { StockArticulo } from 'app/shared/model/stock-articulo.model';

describe('Component Tests', () => {
  describe('StockArticulo Management Component', () => {
    let comp: StockArticuloComponent;
    let fixture: ComponentFixture<StockArticuloComponent>;
    let service: StockArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [StockArticuloComponent],
        providers: []
      })
        .overrideTemplate(StockArticuloComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StockArticuloComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StockArticuloService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StockArticulo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.stockArticulos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
