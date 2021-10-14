import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICobranzaOperacion, CobranzaOperacion } from '../cobranza-operacion.model';

import { CobranzaOperacionService } from './cobranza-operacion.service';

describe('Service Tests', () => {
  describe('CobranzaOperacion Service', () => {
    let service: CobranzaOperacionService;
    let httpMock: HttpTestingController;
    let elemDefault: ICobranzaOperacion;
    let expectedResult: ICobranzaOperacion | ICobranzaOperacion[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CobranzaOperacionService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cobranzaOperacion: 0,
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

      it('should create a CobranzaOperacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CobranzaOperacion()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CobranzaOperacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cobranzaOperacion: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CobranzaOperacion', () => {
        const patchObject = Object.assign({}, new CobranzaOperacion());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CobranzaOperacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cobranzaOperacion: 1,
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

      it('should delete a CobranzaOperacion', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCobranzaOperacionToCollectionIfMissing', () => {
        it('should add a CobranzaOperacion to an empty array', () => {
          const cobranzaOperacion: ICobranzaOperacion = { id: 123 };
          expectedResult = service.addCobranzaOperacionToCollectionIfMissing([], cobranzaOperacion);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cobranzaOperacion);
        });

        it('should not add a CobranzaOperacion to an array that contains it', () => {
          const cobranzaOperacion: ICobranzaOperacion = { id: 123 };
          const cobranzaOperacionCollection: ICobranzaOperacion[] = [
            {
              ...cobranzaOperacion,
            },
            { id: 456 },
          ];
          expectedResult = service.addCobranzaOperacionToCollectionIfMissing(cobranzaOperacionCollection, cobranzaOperacion);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CobranzaOperacion to an array that doesn't contain it", () => {
          const cobranzaOperacion: ICobranzaOperacion = { id: 123 };
          const cobranzaOperacionCollection: ICobranzaOperacion[] = [{ id: 456 }];
          expectedResult = service.addCobranzaOperacionToCollectionIfMissing(cobranzaOperacionCollection, cobranzaOperacion);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cobranzaOperacion);
        });

        it('should add only unique CobranzaOperacion to an array', () => {
          const cobranzaOperacionArray: ICobranzaOperacion[] = [{ id: 123 }, { id: 456 }, { id: 65314 }];
          const cobranzaOperacionCollection: ICobranzaOperacion[] = [{ id: 123 }];
          expectedResult = service.addCobranzaOperacionToCollectionIfMissing(cobranzaOperacionCollection, ...cobranzaOperacionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cobranzaOperacion: ICobranzaOperacion = { id: 123 };
          const cobranzaOperacion2: ICobranzaOperacion = { id: 456 };
          expectedResult = service.addCobranzaOperacionToCollectionIfMissing([], cobranzaOperacion, cobranzaOperacion2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cobranzaOperacion);
          expect(expectedResult).toContain(cobranzaOperacion2);
        });

        it('should accept null and undefined values', () => {
          const cobranzaOperacion: ICobranzaOperacion = { id: 123 };
          expectedResult = service.addCobranzaOperacionToCollectionIfMissing([], null, cobranzaOperacion, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cobranzaOperacion);
        });

        it('should return initial array if no CobranzaOperacion is added', () => {
          const cobranzaOperacionCollection: ICobranzaOperacion[] = [{ id: 123 }];
          expectedResult = service.addCobranzaOperacionToCollectionIfMissing(cobranzaOperacionCollection, undefined, null);
          expect(expectedResult).toEqual(cobranzaOperacionCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
