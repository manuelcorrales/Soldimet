import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMedioDePagoCheque, MedioDePagoCheque } from '../medio-de-pago-cheque.model';

import { MedioDePagoChequeService } from './medio-de-pago-cheque.service';

describe('Service Tests', () => {
  describe('MedioDePagoCheque Service', () => {
    let service: MedioDePagoChequeService;
    let httpMock: HttpTestingController;
    let elemDefault: IMedioDePagoCheque;
    let expectedResult: IMedioDePagoCheque | IMedioDePagoCheque[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MedioDePagoChequeService);
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

      it('should create a MedioDePagoCheque', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MedioDePagoCheque()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MedioDePagoCheque', () => {
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

      it('should partial update a MedioDePagoCheque', () => {
        const patchObject = Object.assign({}, new MedioDePagoCheque());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MedioDePagoCheque', () => {
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

      it('should delete a MedioDePagoCheque', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMedioDePagoChequeToCollectionIfMissing', () => {
        it('should add a MedioDePagoCheque to an empty array', () => {
          const medioDePagoCheque: IMedioDePagoCheque = { id: 123 };
          expectedResult = service.addMedioDePagoChequeToCollectionIfMissing([], medioDePagoCheque);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(medioDePagoCheque);
        });

        it('should not add a MedioDePagoCheque to an array that contains it', () => {
          const medioDePagoCheque: IMedioDePagoCheque = { id: 123 };
          const medioDePagoChequeCollection: IMedioDePagoCheque[] = [
            {
              ...medioDePagoCheque,
            },
            { id: 456 },
          ];
          expectedResult = service.addMedioDePagoChequeToCollectionIfMissing(medioDePagoChequeCollection, medioDePagoCheque);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a MedioDePagoCheque to an array that doesn't contain it", () => {
          const medioDePagoCheque: IMedioDePagoCheque = { id: 123 };
          const medioDePagoChequeCollection: IMedioDePagoCheque[] = [{ id: 456 }];
          expectedResult = service.addMedioDePagoChequeToCollectionIfMissing(medioDePagoChequeCollection, medioDePagoCheque);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(medioDePagoCheque);
        });

        it('should add only unique MedioDePagoCheque to an array', () => {
          const medioDePagoChequeArray: IMedioDePagoCheque[] = [{ id: 123 }, { id: 456 }, { id: 1735 }];
          const medioDePagoChequeCollection: IMedioDePagoCheque[] = [{ id: 123 }];
          expectedResult = service.addMedioDePagoChequeToCollectionIfMissing(medioDePagoChequeCollection, ...medioDePagoChequeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const medioDePagoCheque: IMedioDePagoCheque = { id: 123 };
          const medioDePagoCheque2: IMedioDePagoCheque = { id: 456 };
          expectedResult = service.addMedioDePagoChequeToCollectionIfMissing([], medioDePagoCheque, medioDePagoCheque2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(medioDePagoCheque);
          expect(expectedResult).toContain(medioDePagoCheque2);
        });

        it('should accept null and undefined values', () => {
          const medioDePagoCheque: IMedioDePagoCheque = { id: 123 };
          expectedResult = service.addMedioDePagoChequeToCollectionIfMissing([], null, medioDePagoCheque, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(medioDePagoCheque);
        });

        it('should return initial array if no MedioDePagoCheque is added', () => {
          const medioDePagoChequeCollection: IMedioDePagoCheque[] = [{ id: 123 }];
          expectedResult = service.addMedioDePagoChequeToCollectionIfMissing(medioDePagoChequeCollection, undefined, null);
          expect(expectedResult).toEqual(medioDePagoChequeCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
