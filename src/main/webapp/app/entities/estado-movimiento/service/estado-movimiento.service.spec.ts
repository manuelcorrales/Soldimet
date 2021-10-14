import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEstadoMovimiento, EstadoMovimiento } from '../estado-movimiento.model';

import { EstadoMovimientoService } from './estado-movimiento.service';

describe('Service Tests', () => {
  describe('EstadoMovimiento Service', () => {
    let service: EstadoMovimientoService;
    let httpMock: HttpTestingController;
    let elemDefault: IEstadoMovimiento;
    let expectedResult: IEstadoMovimiento | IEstadoMovimiento[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EstadoMovimientoService);
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

      it('should create a EstadoMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EstadoMovimiento()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EstadoMovimiento', () => {
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

      it('should partial update a EstadoMovimiento', () => {
        const patchObject = Object.assign({}, new EstadoMovimiento());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EstadoMovimiento', () => {
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

      it('should delete a EstadoMovimiento', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEstadoMovimientoToCollectionIfMissing', () => {
        it('should add a EstadoMovimiento to an empty array', () => {
          const estadoMovimiento: IEstadoMovimiento = { id: 123 };
          expectedResult = service.addEstadoMovimientoToCollectionIfMissing([], estadoMovimiento);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoMovimiento);
        });

        it('should not add a EstadoMovimiento to an array that contains it', () => {
          const estadoMovimiento: IEstadoMovimiento = { id: 123 };
          const estadoMovimientoCollection: IEstadoMovimiento[] = [
            {
              ...estadoMovimiento,
            },
            { id: 456 },
          ];
          expectedResult = service.addEstadoMovimientoToCollectionIfMissing(estadoMovimientoCollection, estadoMovimiento);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EstadoMovimiento to an array that doesn't contain it", () => {
          const estadoMovimiento: IEstadoMovimiento = { id: 123 };
          const estadoMovimientoCollection: IEstadoMovimiento[] = [{ id: 456 }];
          expectedResult = service.addEstadoMovimientoToCollectionIfMissing(estadoMovimientoCollection, estadoMovimiento);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoMovimiento);
        });

        it('should add only unique EstadoMovimiento to an array', () => {
          const estadoMovimientoArray: IEstadoMovimiento[] = [{ id: 123 }, { id: 456 }, { id: 89728 }];
          const estadoMovimientoCollection: IEstadoMovimiento[] = [{ id: 123 }];
          expectedResult = service.addEstadoMovimientoToCollectionIfMissing(estadoMovimientoCollection, ...estadoMovimientoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const estadoMovimiento: IEstadoMovimiento = { id: 123 };
          const estadoMovimiento2: IEstadoMovimiento = { id: 456 };
          expectedResult = service.addEstadoMovimientoToCollectionIfMissing([], estadoMovimiento, estadoMovimiento2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoMovimiento);
          expect(expectedResult).toContain(estadoMovimiento2);
        });

        it('should accept null and undefined values', () => {
          const estadoMovimiento: IEstadoMovimiento = { id: 123 };
          expectedResult = service.addEstadoMovimientoToCollectionIfMissing([], null, estadoMovimiento, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoMovimiento);
        });

        it('should return initial array if no EstadoMovimiento is added', () => {
          const estadoMovimientoCollection: IEstadoMovimiento[] = [{ id: 123 }];
          expectedResult = service.addEstadoMovimientoToCollectionIfMissing(estadoMovimientoCollection, undefined, null);
          expect(expectedResult).toEqual(estadoMovimientoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
