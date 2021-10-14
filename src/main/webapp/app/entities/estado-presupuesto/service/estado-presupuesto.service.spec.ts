import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEstadoPresupuesto, EstadoPresupuesto } from '../estado-presupuesto.model';

import { EstadoPresupuestoService } from './estado-presupuesto.service';

describe('Service Tests', () => {
  describe('EstadoPresupuesto Service', () => {
    let service: EstadoPresupuestoService;
    let httpMock: HttpTestingController;
    let elemDefault: IEstadoPresupuesto;
    let expectedResult: IEstadoPresupuesto | IEstadoPresupuesto[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EstadoPresupuestoService);
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

      it('should create a EstadoPresupuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EstadoPresupuesto()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EstadoPresupuesto', () => {
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

      it('should partial update a EstadoPresupuesto', () => {
        const patchObject = Object.assign(
          {
            nombreEstado: 'BBBBBB',
          },
          new EstadoPresupuesto()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EstadoPresupuesto', () => {
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

      it('should delete a EstadoPresupuesto', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEstadoPresupuestoToCollectionIfMissing', () => {
        it('should add a EstadoPresupuesto to an empty array', () => {
          const estadoPresupuesto: IEstadoPresupuesto = { id: 123 };
          expectedResult = service.addEstadoPresupuestoToCollectionIfMissing([], estadoPresupuesto);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoPresupuesto);
        });

        it('should not add a EstadoPresupuesto to an array that contains it', () => {
          const estadoPresupuesto: IEstadoPresupuesto = { id: 123 };
          const estadoPresupuestoCollection: IEstadoPresupuesto[] = [
            {
              ...estadoPresupuesto,
            },
            { id: 456 },
          ];
          expectedResult = service.addEstadoPresupuestoToCollectionIfMissing(estadoPresupuestoCollection, estadoPresupuesto);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EstadoPresupuesto to an array that doesn't contain it", () => {
          const estadoPresupuesto: IEstadoPresupuesto = { id: 123 };
          const estadoPresupuestoCollection: IEstadoPresupuesto[] = [{ id: 456 }];
          expectedResult = service.addEstadoPresupuestoToCollectionIfMissing(estadoPresupuestoCollection, estadoPresupuesto);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoPresupuesto);
        });

        it('should add only unique EstadoPresupuesto to an array', () => {
          const estadoPresupuestoArray: IEstadoPresupuesto[] = [{ id: 123 }, { id: 456 }, { id: 70826 }];
          const estadoPresupuestoCollection: IEstadoPresupuesto[] = [{ id: 123 }];
          expectedResult = service.addEstadoPresupuestoToCollectionIfMissing(estadoPresupuestoCollection, ...estadoPresupuestoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const estadoPresupuesto: IEstadoPresupuesto = { id: 123 };
          const estadoPresupuesto2: IEstadoPresupuesto = { id: 456 };
          expectedResult = service.addEstadoPresupuestoToCollectionIfMissing([], estadoPresupuesto, estadoPresupuesto2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoPresupuesto);
          expect(expectedResult).toContain(estadoPresupuesto2);
        });

        it('should accept null and undefined values', () => {
          const estadoPresupuesto: IEstadoPresupuesto = { id: 123 };
          expectedResult = service.addEstadoPresupuestoToCollectionIfMissing([], null, estadoPresupuesto, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoPresupuesto);
        });

        it('should return initial array if no EstadoPresupuesto is added', () => {
          const estadoPresupuestoCollection: IEstadoPresupuesto[] = [{ id: 123 }];
          expectedResult = service.addEstadoPresupuestoToCollectionIfMissing(estadoPresupuestoCollection, undefined, null);
          expect(expectedResult).toEqual(estadoPresupuestoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
