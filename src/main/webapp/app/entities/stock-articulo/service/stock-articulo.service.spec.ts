import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IStockArticulo, StockArticulo } from '../stock-articulo.model';

import { StockArticuloService } from './stock-articulo.service';

describe('Service Tests', () => {
  describe('StockArticulo Service', () => {
    let service: StockArticuloService;
    let httpMock: HttpTestingController;
    let elemDefault: IStockArticulo;
    let expectedResult: IStockArticulo | IStockArticulo[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(StockArticuloService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cantidad: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a StockArticulo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new StockArticulo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a StockArticulo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidad: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a StockArticulo', () => {
        const patchObject = Object.assign({}, new StockArticulo());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of StockArticulo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidad: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a StockArticulo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addStockArticuloToCollectionIfMissing', () => {
        it('should add a StockArticulo to an empty array', () => {
          const stockArticulo: IStockArticulo = { id: 123 };
          expectedResult = service.addStockArticuloToCollectionIfMissing([], stockArticulo);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(stockArticulo);
        });

        it('should not add a StockArticulo to an array that contains it', () => {
          const stockArticulo: IStockArticulo = { id: 123 };
          const stockArticuloCollection: IStockArticulo[] = [
            {
              ...stockArticulo,
            },
            { id: 456 },
          ];
          expectedResult = service.addStockArticuloToCollectionIfMissing(stockArticuloCollection, stockArticulo);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a StockArticulo to an array that doesn't contain it", () => {
          const stockArticulo: IStockArticulo = { id: 123 };
          const stockArticuloCollection: IStockArticulo[] = [{ id: 456 }];
          expectedResult = service.addStockArticuloToCollectionIfMissing(stockArticuloCollection, stockArticulo);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(stockArticulo);
        });

        it('should add only unique StockArticulo to an array', () => {
          const stockArticuloArray: IStockArticulo[] = [{ id: 123 }, { id: 456 }, { id: 47855 }];
          const stockArticuloCollection: IStockArticulo[] = [{ id: 123 }];
          expectedResult = service.addStockArticuloToCollectionIfMissing(stockArticuloCollection, ...stockArticuloArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const stockArticulo: IStockArticulo = { id: 123 };
          const stockArticulo2: IStockArticulo = { id: 456 };
          expectedResult = service.addStockArticuloToCollectionIfMissing([], stockArticulo, stockArticulo2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(stockArticulo);
          expect(expectedResult).toContain(stockArticulo2);
        });

        it('should accept null and undefined values', () => {
          const stockArticulo: IStockArticulo = { id: 123 };
          expectedResult = service.addStockArticuloToCollectionIfMissing([], null, stockArticulo, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(stockArticulo);
        });

        it('should return initial array if no StockArticulo is added', () => {
          const stockArticuloCollection: IStockArticulo[] = [{ id: 123 }];
          expectedResult = service.addStockArticuloToCollectionIfMissing(stockArticuloCollection, undefined, null);
          expect(expectedResult).toEqual(stockArticuloCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
