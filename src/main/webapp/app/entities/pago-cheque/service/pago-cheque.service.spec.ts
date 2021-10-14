import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPagoCheque, PagoCheque } from '../pago-cheque.model';

import { PagoChequeService } from './pago-cheque.service';

describe('Service Tests', () => {
  describe('PagoCheque Service', () => {
    let service: PagoChequeService;
    let httpMock: HttpTestingController;
    let elemDefault: IPagoCheque;
    let expectedResult: IPagoCheque | IPagoCheque[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PagoChequeService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        numeroCheque: 'AAAAAAA',
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

      it('should create a PagoCheque', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new PagoCheque()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PagoCheque', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            numeroCheque: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a PagoCheque', () => {
        const patchObject = Object.assign({}, new PagoCheque());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PagoCheque', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            numeroCheque: 'BBBBBB',
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

      it('should delete a PagoCheque', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPagoChequeToCollectionIfMissing', () => {
        it('should add a PagoCheque to an empty array', () => {
          const pagoCheque: IPagoCheque = { id: 123 };
          expectedResult = service.addPagoChequeToCollectionIfMissing([], pagoCheque);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(pagoCheque);
        });

        it('should not add a PagoCheque to an array that contains it', () => {
          const pagoCheque: IPagoCheque = { id: 123 };
          const pagoChequeCollection: IPagoCheque[] = [
            {
              ...pagoCheque,
            },
            { id: 456 },
          ];
          expectedResult = service.addPagoChequeToCollectionIfMissing(pagoChequeCollection, pagoCheque);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a PagoCheque to an array that doesn't contain it", () => {
          const pagoCheque: IPagoCheque = { id: 123 };
          const pagoChequeCollection: IPagoCheque[] = [{ id: 456 }];
          expectedResult = service.addPagoChequeToCollectionIfMissing(pagoChequeCollection, pagoCheque);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(pagoCheque);
        });

        it('should add only unique PagoCheque to an array', () => {
          const pagoChequeArray: IPagoCheque[] = [{ id: 123 }, { id: 456 }, { id: 59985 }];
          const pagoChequeCollection: IPagoCheque[] = [{ id: 123 }];
          expectedResult = service.addPagoChequeToCollectionIfMissing(pagoChequeCollection, ...pagoChequeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const pagoCheque: IPagoCheque = { id: 123 };
          const pagoCheque2: IPagoCheque = { id: 456 };
          expectedResult = service.addPagoChequeToCollectionIfMissing([], pagoCheque, pagoCheque2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(pagoCheque);
          expect(expectedResult).toContain(pagoCheque2);
        });

        it('should accept null and undefined values', () => {
          const pagoCheque: IPagoCheque = { id: 123 };
          expectedResult = service.addPagoChequeToCollectionIfMissing([], null, pagoCheque, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(pagoCheque);
        });

        it('should return initial array if no PagoCheque is added', () => {
          const pagoChequeCollection: IPagoCheque[] = [{ id: 123 }];
          expectedResult = service.addPagoChequeToCollectionIfMissing(pagoChequeCollection, undefined, null);
          expect(expectedResult).toEqual(pagoChequeCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
