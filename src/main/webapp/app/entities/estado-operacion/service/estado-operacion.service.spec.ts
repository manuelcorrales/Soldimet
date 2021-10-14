import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEstadoOperacion, EstadoOperacion } from '../estado-operacion.model';

import { EstadoOperacionService } from './estado-operacion.service';

describe('Service Tests', () => {
  describe('EstadoOperacion Service', () => {
    let service: EstadoOperacionService;
    let httpMock: HttpTestingController;
    let elemDefault: IEstadoOperacion;
    let expectedResult: IEstadoOperacion | IEstadoOperacion[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EstadoOperacionService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombreEstado: 'AAAAAAA',
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

      it('should create a EstadoOperacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EstadoOperacion()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EstadoOperacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreEstado: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a EstadoOperacion', () => {
        const patchObject = Object.assign(
          {
            nombreEstado: 'BBBBBB',
          },
          new EstadoOperacion()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EstadoOperacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreEstado: 'BBBBBB',
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

      it('should delete a EstadoOperacion', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEstadoOperacionToCollectionIfMissing', () => {
        it('should add a EstadoOperacion to an empty array', () => {
          const estadoOperacion: IEstadoOperacion = { id: 123 };
          expectedResult = service.addEstadoOperacionToCollectionIfMissing([], estadoOperacion);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoOperacion);
        });

        it('should not add a EstadoOperacion to an array that contains it', () => {
          const estadoOperacion: IEstadoOperacion = { id: 123 };
          const estadoOperacionCollection: IEstadoOperacion[] = [
            {
              ...estadoOperacion,
            },
            { id: 456 },
          ];
          expectedResult = service.addEstadoOperacionToCollectionIfMissing(estadoOperacionCollection, estadoOperacion);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EstadoOperacion to an array that doesn't contain it", () => {
          const estadoOperacion: IEstadoOperacion = { id: 123 };
          const estadoOperacionCollection: IEstadoOperacion[] = [{ id: 456 }];
          expectedResult = service.addEstadoOperacionToCollectionIfMissing(estadoOperacionCollection, estadoOperacion);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoOperacion);
        });

        it('should add only unique EstadoOperacion to an array', () => {
          const estadoOperacionArray: IEstadoOperacion[] = [{ id: 123 }, { id: 456 }, { id: 32508 }];
          const estadoOperacionCollection: IEstadoOperacion[] = [{ id: 123 }];
          expectedResult = service.addEstadoOperacionToCollectionIfMissing(estadoOperacionCollection, ...estadoOperacionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const estadoOperacion: IEstadoOperacion = { id: 123 };
          const estadoOperacion2: IEstadoOperacion = { id: 456 };
          expectedResult = service.addEstadoOperacionToCollectionIfMissing([], estadoOperacion, estadoOperacion2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoOperacion);
          expect(expectedResult).toContain(estadoOperacion2);
        });

        it('should accept null and undefined values', () => {
          const estadoOperacion: IEstadoOperacion = { id: 123 };
          expectedResult = service.addEstadoOperacionToCollectionIfMissing([], null, estadoOperacion, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoOperacion);
        });

        it('should return initial array if no EstadoOperacion is added', () => {
          const estadoOperacionCollection: IEstadoOperacion[] = [{ id: 123 }];
          expectedResult = service.addEstadoOperacionToCollectionIfMissing(estadoOperacionCollection, undefined, null);
          expect(expectedResult).toEqual(estadoOperacionCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
