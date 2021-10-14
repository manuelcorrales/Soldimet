import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICostoOperacion, CostoOperacion } from '../costo-operacion.model';

import { CostoOperacionService } from './costo-operacion.service';

describe('Service Tests', () => {
  describe('CostoOperacion Service', () => {
    let service: CostoOperacionService;
    let httpMock: HttpTestingController;
    let elemDefault: ICostoOperacion;
    let expectedResult: ICostoOperacion | ICostoOperacion[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CostoOperacionService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        costoOperacion: 0,
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

      it('should create a CostoOperacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CostoOperacion()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CostoOperacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            costoOperacion: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CostoOperacion', () => {
        const patchObject = Object.assign({}, new CostoOperacion());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CostoOperacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            costoOperacion: 1,
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

      it('should delete a CostoOperacion', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCostoOperacionToCollectionIfMissing', () => {
        it('should add a CostoOperacion to an empty array', () => {
          const costoOperacion: ICostoOperacion = { id: 123 };
          expectedResult = service.addCostoOperacionToCollectionIfMissing([], costoOperacion);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(costoOperacion);
        });

        it('should not add a CostoOperacion to an array that contains it', () => {
          const costoOperacion: ICostoOperacion = { id: 123 };
          const costoOperacionCollection: ICostoOperacion[] = [
            {
              ...costoOperacion,
            },
            { id: 456 },
          ];
          expectedResult = service.addCostoOperacionToCollectionIfMissing(costoOperacionCollection, costoOperacion);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CostoOperacion to an array that doesn't contain it", () => {
          const costoOperacion: ICostoOperacion = { id: 123 };
          const costoOperacionCollection: ICostoOperacion[] = [{ id: 456 }];
          expectedResult = service.addCostoOperacionToCollectionIfMissing(costoOperacionCollection, costoOperacion);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(costoOperacion);
        });

        it('should add only unique CostoOperacion to an array', () => {
          const costoOperacionArray: ICostoOperacion[] = [{ id: 123 }, { id: 456 }, { id: 80294 }];
          const costoOperacionCollection: ICostoOperacion[] = [{ id: 123 }];
          expectedResult = service.addCostoOperacionToCollectionIfMissing(costoOperacionCollection, ...costoOperacionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const costoOperacion: ICostoOperacion = { id: 123 };
          const costoOperacion2: ICostoOperacion = { id: 456 };
          expectedResult = service.addCostoOperacionToCollectionIfMissing([], costoOperacion, costoOperacion2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(costoOperacion);
          expect(expectedResult).toContain(costoOperacion2);
        });

        it('should accept null and undefined values', () => {
          const costoOperacion: ICostoOperacion = { id: 123 };
          expectedResult = service.addCostoOperacionToCollectionIfMissing([], null, costoOperacion, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(costoOperacion);
        });

        it('should return initial array if no CostoOperacion is added', () => {
          const costoOperacionCollection: ICostoOperacion[] = [{ id: 123 }];
          expectedResult = service.addCostoOperacionToCollectionIfMissing(costoOperacionCollection, undefined, null);
          expect(expectedResult).toEqual(costoOperacionCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
