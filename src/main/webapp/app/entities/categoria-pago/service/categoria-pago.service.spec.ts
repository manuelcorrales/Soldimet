import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICategoriaPago, CategoriaPago } from '../categoria-pago.model';

import { CategoriaPagoService } from './categoria-pago.service';

describe('Service Tests', () => {
  describe('CategoriaPago Service', () => {
    let service: CategoriaPagoService;
    let httpMock: HttpTestingController;
    let elemDefault: ICategoriaPago;
    let expectedResult: ICategoriaPago | ICategoriaPago[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CategoriaPagoService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombreCategoriaPago: 'AAAAAAA',
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

      it('should create a CategoriaPago', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CategoriaPago()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CategoriaPago', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreCategoriaPago: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CategoriaPago', () => {
        const patchObject = Object.assign({}, new CategoriaPago());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CategoriaPago', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreCategoriaPago: 'BBBBBB',
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

      it('should delete a CategoriaPago', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCategoriaPagoToCollectionIfMissing', () => {
        it('should add a CategoriaPago to an empty array', () => {
          const categoriaPago: ICategoriaPago = { id: 123 };
          expectedResult = service.addCategoriaPagoToCollectionIfMissing([], categoriaPago);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(categoriaPago);
        });

        it('should not add a CategoriaPago to an array that contains it', () => {
          const categoriaPago: ICategoriaPago = { id: 123 };
          const categoriaPagoCollection: ICategoriaPago[] = [
            {
              ...categoriaPago,
            },
            { id: 456 },
          ];
          expectedResult = service.addCategoriaPagoToCollectionIfMissing(categoriaPagoCollection, categoriaPago);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CategoriaPago to an array that doesn't contain it", () => {
          const categoriaPago: ICategoriaPago = { id: 123 };
          const categoriaPagoCollection: ICategoriaPago[] = [{ id: 456 }];
          expectedResult = service.addCategoriaPagoToCollectionIfMissing(categoriaPagoCollection, categoriaPago);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(categoriaPago);
        });

        it('should add only unique CategoriaPago to an array', () => {
          const categoriaPagoArray: ICategoriaPago[] = [{ id: 123 }, { id: 456 }, { id: 8735 }];
          const categoriaPagoCollection: ICategoriaPago[] = [{ id: 123 }];
          expectedResult = service.addCategoriaPagoToCollectionIfMissing(categoriaPagoCollection, ...categoriaPagoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const categoriaPago: ICategoriaPago = { id: 123 };
          const categoriaPago2: ICategoriaPago = { id: 456 };
          expectedResult = service.addCategoriaPagoToCollectionIfMissing([], categoriaPago, categoriaPago2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(categoriaPago);
          expect(expectedResult).toContain(categoriaPago2);
        });

        it('should accept null and undefined values', () => {
          const categoriaPago: ICategoriaPago = { id: 123 };
          expectedResult = service.addCategoriaPagoToCollectionIfMissing([], null, categoriaPago, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(categoriaPago);
        });

        it('should return initial array if no CategoriaPago is added', () => {
          const categoriaPagoCollection: ICategoriaPago[] = [{ id: 123 }];
          expectedResult = service.addCategoriaPagoToCollectionIfMissing(categoriaPagoCollection, undefined, null);
          expect(expectedResult).toEqual(categoriaPagoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
