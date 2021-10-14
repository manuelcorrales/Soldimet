import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEstadoCostoRepuesto, EstadoCostoRepuesto } from '../estado-costo-repuesto.model';

import { EstadoCostoRepuestoService } from './estado-costo-repuesto.service';

describe('Service Tests', () => {
  describe('EstadoCostoRepuesto Service', () => {
    let service: EstadoCostoRepuestoService;
    let httpMock: HttpTestingController;
    let elemDefault: IEstadoCostoRepuesto;
    let expectedResult: IEstadoCostoRepuesto | IEstadoCostoRepuesto[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EstadoCostoRepuestoService);
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

      it('should create a EstadoCostoRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EstadoCostoRepuesto()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EstadoCostoRepuesto', () => {
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

      it('should partial update a EstadoCostoRepuesto', () => {
        const patchObject = Object.assign({}, new EstadoCostoRepuesto());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EstadoCostoRepuesto', () => {
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

      it('should delete a EstadoCostoRepuesto', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEstadoCostoRepuestoToCollectionIfMissing', () => {
        it('should add a EstadoCostoRepuesto to an empty array', () => {
          const estadoCostoRepuesto: IEstadoCostoRepuesto = { id: 123 };
          expectedResult = service.addEstadoCostoRepuestoToCollectionIfMissing([], estadoCostoRepuesto);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoCostoRepuesto);
        });

        it('should not add a EstadoCostoRepuesto to an array that contains it', () => {
          const estadoCostoRepuesto: IEstadoCostoRepuesto = { id: 123 };
          const estadoCostoRepuestoCollection: IEstadoCostoRepuesto[] = [
            {
              ...estadoCostoRepuesto,
            },
            { id: 456 },
          ];
          expectedResult = service.addEstadoCostoRepuestoToCollectionIfMissing(estadoCostoRepuestoCollection, estadoCostoRepuesto);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EstadoCostoRepuesto to an array that doesn't contain it", () => {
          const estadoCostoRepuesto: IEstadoCostoRepuesto = { id: 123 };
          const estadoCostoRepuestoCollection: IEstadoCostoRepuesto[] = [{ id: 456 }];
          expectedResult = service.addEstadoCostoRepuestoToCollectionIfMissing(estadoCostoRepuestoCollection, estadoCostoRepuesto);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoCostoRepuesto);
        });

        it('should add only unique EstadoCostoRepuesto to an array', () => {
          const estadoCostoRepuestoArray: IEstadoCostoRepuesto[] = [{ id: 123 }, { id: 456 }, { id: 58863 }];
          const estadoCostoRepuestoCollection: IEstadoCostoRepuesto[] = [{ id: 123 }];
          expectedResult = service.addEstadoCostoRepuestoToCollectionIfMissing(estadoCostoRepuestoCollection, ...estadoCostoRepuestoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const estadoCostoRepuesto: IEstadoCostoRepuesto = { id: 123 };
          const estadoCostoRepuesto2: IEstadoCostoRepuesto = { id: 456 };
          expectedResult = service.addEstadoCostoRepuestoToCollectionIfMissing([], estadoCostoRepuesto, estadoCostoRepuesto2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoCostoRepuesto);
          expect(expectedResult).toContain(estadoCostoRepuesto2);
        });

        it('should accept null and undefined values', () => {
          const estadoCostoRepuesto: IEstadoCostoRepuesto = { id: 123 };
          expectedResult = service.addEstadoCostoRepuestoToCollectionIfMissing([], null, estadoCostoRepuesto, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoCostoRepuesto);
        });

        it('should return initial array if no EstadoCostoRepuesto is added', () => {
          const estadoCostoRepuestoCollection: IEstadoCostoRepuesto[] = [{ id: 123 }];
          expectedResult = service.addEstadoCostoRepuestoToCollectionIfMissing(estadoCostoRepuestoCollection, undefined, null);
          expect(expectedResult).toEqual(estadoCostoRepuestoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
