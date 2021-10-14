import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEstadoCobranzaOperacion, EstadoCobranzaOperacion } from '../estado-cobranza-operacion.model';

import { EstadoCobranzaOperacionService } from './estado-cobranza-operacion.service';

describe('Service Tests', () => {
  describe('EstadoCobranzaOperacion Service', () => {
    let service: EstadoCobranzaOperacionService;
    let httpMock: HttpTestingController;
    let elemDefault: IEstadoCobranzaOperacion;
    let expectedResult: IEstadoCobranzaOperacion | IEstadoCobranzaOperacion[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EstadoCobranzaOperacionService);
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

      it('should create a EstadoCobranzaOperacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EstadoCobranzaOperacion()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EstadoCobranzaOperacion', () => {
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

      it('should partial update a EstadoCobranzaOperacion', () => {
        const patchObject = Object.assign({}, new EstadoCobranzaOperacion());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EstadoCobranzaOperacion', () => {
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

      it('should delete a EstadoCobranzaOperacion', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEstadoCobranzaOperacionToCollectionIfMissing', () => {
        it('should add a EstadoCobranzaOperacion to an empty array', () => {
          const estadoCobranzaOperacion: IEstadoCobranzaOperacion = { id: 123 };
          expectedResult = service.addEstadoCobranzaOperacionToCollectionIfMissing([], estadoCobranzaOperacion);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoCobranzaOperacion);
        });

        it('should not add a EstadoCobranzaOperacion to an array that contains it', () => {
          const estadoCobranzaOperacion: IEstadoCobranzaOperacion = { id: 123 };
          const estadoCobranzaOperacionCollection: IEstadoCobranzaOperacion[] = [
            {
              ...estadoCobranzaOperacion,
            },
            { id: 456 },
          ];
          expectedResult = service.addEstadoCobranzaOperacionToCollectionIfMissing(
            estadoCobranzaOperacionCollection,
            estadoCobranzaOperacion
          );
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EstadoCobranzaOperacion to an array that doesn't contain it", () => {
          const estadoCobranzaOperacion: IEstadoCobranzaOperacion = { id: 123 };
          const estadoCobranzaOperacionCollection: IEstadoCobranzaOperacion[] = [{ id: 456 }];
          expectedResult = service.addEstadoCobranzaOperacionToCollectionIfMissing(
            estadoCobranzaOperacionCollection,
            estadoCobranzaOperacion
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoCobranzaOperacion);
        });

        it('should add only unique EstadoCobranzaOperacion to an array', () => {
          const estadoCobranzaOperacionArray: IEstadoCobranzaOperacion[] = [{ id: 123 }, { id: 456 }, { id: 15047 }];
          const estadoCobranzaOperacionCollection: IEstadoCobranzaOperacion[] = [{ id: 123 }];
          expectedResult = service.addEstadoCobranzaOperacionToCollectionIfMissing(
            estadoCobranzaOperacionCollection,
            ...estadoCobranzaOperacionArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const estadoCobranzaOperacion: IEstadoCobranzaOperacion = { id: 123 };
          const estadoCobranzaOperacion2: IEstadoCobranzaOperacion = { id: 456 };
          expectedResult = service.addEstadoCobranzaOperacionToCollectionIfMissing([], estadoCobranzaOperacion, estadoCobranzaOperacion2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoCobranzaOperacion);
          expect(expectedResult).toContain(estadoCobranzaOperacion2);
        });

        it('should accept null and undefined values', () => {
          const estadoCobranzaOperacion: IEstadoCobranzaOperacion = { id: 123 };
          expectedResult = service.addEstadoCobranzaOperacionToCollectionIfMissing([], null, estadoCobranzaOperacion, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoCobranzaOperacion);
        });

        it('should return initial array if no EstadoCobranzaOperacion is added', () => {
          const estadoCobranzaOperacionCollection: IEstadoCobranzaOperacion[] = [{ id: 123 }];
          expectedResult = service.addEstadoCobranzaOperacionToCollectionIfMissing(estadoCobranzaOperacionCollection, undefined, null);
          expect(expectedResult).toEqual(estadoCobranzaOperacionCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
