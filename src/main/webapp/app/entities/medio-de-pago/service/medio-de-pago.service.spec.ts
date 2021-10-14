import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMedioDePago, MedioDePago } from '../medio-de-pago.model';

import { MedioDePagoService } from './medio-de-pago.service';

describe('Service Tests', () => {
  describe('MedioDePago Service', () => {
    let service: MedioDePagoService;
    let httpMock: HttpTestingController;
    let elemDefault: IMedioDePago;
    let expectedResult: IMedioDePago | IMedioDePago[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MedioDePagoService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
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

      it('should create a MedioDePago', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MedioDePago()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MedioDePago', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a MedioDePago', () => {
        const patchObject = Object.assign({}, new MedioDePago());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MedioDePago', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
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

      it('should delete a MedioDePago', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMedioDePagoToCollectionIfMissing', () => {
        it('should add a MedioDePago to an empty array', () => {
          const medioDePago: IMedioDePago = { id: 123 };
          expectedResult = service.addMedioDePagoToCollectionIfMissing([], medioDePago);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(medioDePago);
        });

        it('should not add a MedioDePago to an array that contains it', () => {
          const medioDePago: IMedioDePago = { id: 123 };
          const medioDePagoCollection: IMedioDePago[] = [
            {
              ...medioDePago,
            },
            { id: 456 },
          ];
          expectedResult = service.addMedioDePagoToCollectionIfMissing(medioDePagoCollection, medioDePago);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a MedioDePago to an array that doesn't contain it", () => {
          const medioDePago: IMedioDePago = { id: 123 };
          const medioDePagoCollection: IMedioDePago[] = [{ id: 456 }];
          expectedResult = service.addMedioDePagoToCollectionIfMissing(medioDePagoCollection, medioDePago);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(medioDePago);
        });

        it('should add only unique MedioDePago to an array', () => {
          const medioDePagoArray: IMedioDePago[] = [{ id: 123 }, { id: 456 }, { id: 77595 }];
          const medioDePagoCollection: IMedioDePago[] = [{ id: 123 }];
          expectedResult = service.addMedioDePagoToCollectionIfMissing(medioDePagoCollection, ...medioDePagoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const medioDePago: IMedioDePago = { id: 123 };
          const medioDePago2: IMedioDePago = { id: 456 };
          expectedResult = service.addMedioDePagoToCollectionIfMissing([], medioDePago, medioDePago2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(medioDePago);
          expect(expectedResult).toContain(medioDePago2);
        });

        it('should accept null and undefined values', () => {
          const medioDePago: IMedioDePago = { id: 123 };
          expectedResult = service.addMedioDePagoToCollectionIfMissing([], null, medioDePago, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(medioDePago);
        });

        it('should return initial array if no MedioDePago is added', () => {
          const medioDePagoCollection: IMedioDePago[] = [{ id: 123 }];
          expectedResult = service.addMedioDePagoToCollectionIfMissing(medioDePagoCollection, undefined, null);
          expect(expectedResult).toEqual(medioDePagoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
