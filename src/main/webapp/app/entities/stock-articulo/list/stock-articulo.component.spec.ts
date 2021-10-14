import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { StockArticuloService } from '../service/stock-articulo.service';

import { StockArticuloComponent } from './stock-articulo.component';

describe('Component Tests', () => {
  describe('StockArticulo Management Component', () => {
    let comp: StockArticuloComponent;
    let fixture: ComponentFixture<StockArticuloComponent>;
    let service: StockArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [StockArticuloComponent],
      })
        .overrideTemplate(StockArticuloComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StockArticuloComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(StockArticuloService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.stockArticulos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
