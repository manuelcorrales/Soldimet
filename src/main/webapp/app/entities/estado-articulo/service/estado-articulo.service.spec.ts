import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEstadoArticulo, EstadoArticulo } from '../estado-articulo.model';

import { EstadoArticuloService } from './estado-articulo.service';

describe('Service Tests', () => {
  describe('EstadoArticulo Service', () => {
    let service: EstadoArticuloService;
    let httpMock: HttpTestingController;
    let elemDefault: IEstadoArticulo;
    let expectedResult: IEstadoArticulo | IEstadoArticulo[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EstadoArticuloService);
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

      it('should create a EstadoArticulo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EstadoArticulo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EstadoArticulo', () => {
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

      it('should partial update a EstadoArticulo', () => {
        const patchObject = Object.assign({}, new EstadoArticulo());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EstadoArticulo', () => {
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

      it('should delete a EstadoArticulo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEstadoArticuloToCollectionIfMissing', () => {
        it('should add a EstadoArticulo to an empty array', () => {
          const estadoArticulo: IEstadoArticulo = { id: 123 };
          expectedResult = service.addEstadoArticuloToCollectionIfMissing([], estadoArticulo);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoArticulo);
        });

        it('should not add a EstadoArticulo to an array that contains it', () => {
          const estadoArticulo: IEstadoArticulo = { id: 123 };
          const estadoArticuloCollection: IEstadoArticulo[] = [
            {
              ...estadoArticulo,
            },
            { id: 456 },
          ];
          expectedResult = service.addEstadoArticuloToCollectionIfMissing(estadoArticuloCollection, estadoArticulo);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EstadoArticulo to an array that doesn't contain it", () => {
          const estadoArticulo: IEstadoArticulo = { id: 123 };
          const estadoArticuloCollection: IEstadoArticulo[] = [{ id: 456 }];
          expectedResult = service.addEstadoArticuloToCollectionIfMissing(estadoArticuloCollection, estadoArticulo);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoArticulo);
        });

        it('should add only unique EstadoArticulo to an array', () => {
          const estadoArticuloArray: IEstadoArticulo[] = [{ id: 123 }, { id: 456 }, { id: 73465 }];
          const estadoArticuloCollection: IEstadoArticulo[] = [{ id: 123 }];
          expectedResult = service.addEstadoArticuloToCollectionIfMissing(estadoArticuloCollection, ...estadoArticuloArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const estadoArticulo: IEstadoArticulo = { id: 123 };
          const estadoArticulo2: IEstadoArticulo = { id: 456 };
          expectedResult = service.addEstadoArticuloToCollectionIfMissing([], estadoArticulo, estadoArticulo2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoArticulo);
          expect(expectedResult).toContain(estadoArticulo2);
        });

        it('should accept null and undefined values', () => {
          const estadoArticulo: IEstadoArticulo = { id: 123 };
          expectedResult = service.addEstadoArticuloToCollectionIfMissing([], null, estadoArticulo, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoArticulo);
        });

        it('should return initial array if no EstadoArticulo is added', () => {
          const estadoArticuloCollection: IEstadoArticulo[] = [{ id: 123 }];
          expectedResult = service.addEstadoArticuloToCollectionIfMissing(estadoArticuloCollection, undefined, null);
          expect(expectedResult).toEqual(estadoArticuloCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
