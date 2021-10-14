import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMovimientoPresupuesto, MovimientoPresupuesto } from '../movimiento-presupuesto.model';

import { MovimientoPresupuestoService } from './movimiento-presupuesto.service';

describe('Service Tests', () => {
  describe('MovimientoPresupuesto Service', () => {
    let service: MovimientoPresupuestoService;
    let httpMock: HttpTestingController;
    let elemDefault: IMovimientoPresupuesto;
    let expectedResult: IMovimientoPresupuesto | IMovimientoPresupuesto[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MovimientoPresupuestoService);
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

      it('should create a MovimientoPresupuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MovimientoPresupuesto()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MovimientoPresupuesto', () => {
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

      it('should partial update a MovimientoPresupuesto', () => {
        const patchObject = Object.assign({}, new MovimientoPresupuesto());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MovimientoPresupuesto', () => {
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

      it('should delete a MovimientoPresupuesto', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMovimientoPresupuestoToCollectionIfMissing', () => {
        it('should add a MovimientoPresupuesto to an empty array', () => {
          const movimientoPresupuesto: IMovimientoPresupuesto = { id: 123 };
          expectedResult = service.addMovimientoPresupuestoToCollectionIfMissing([], movimientoPresupuesto);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(movimientoPresupuesto);
        });

        it('should not add a MovimientoPresupuesto to an array that contains it', () => {
          const movimientoPresupuesto: IMovimientoPresupuesto = { id: 123 };
          const movimientoPresupuestoCollection: IMovimientoPresupuesto[] = [
            {
              ...movimientoPresupuesto,
            },
            { id: 456 },
          ];
          expectedResult = service.addMovimientoPresupuestoToCollectionIfMissing(movimientoPresupuestoCollection, movimientoPresupuesto);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a MovimientoPresupuesto to an array that doesn't contain it", () => {
          const movimientoPresupuesto: IMovimientoPresupuesto = { id: 123 };
          const movimientoPresupuestoCollection: IMovimientoPresupuesto[] = [{ id: 456 }];
          expectedResult = service.addMovimientoPresupuestoToCollectionIfMissing(movimientoPresupuestoCollection, movimientoPresupuesto);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(movimientoPresupuesto);
        });

        it('should add only unique MovimientoPresupuesto to an array', () => {
          const movimientoPresupuestoArray: IMovimientoPresupuesto[] = [{ id: 123 }, { id: 456 }, { id: 20282 }];
          const movimientoPresupuestoCollection: IMovimientoPresupuesto[] = [{ id: 123 }];
          expectedResult = service.addMovimientoPresupuestoToCollectionIfMissing(
            movimientoPresupuestoCollection,
            ...movimientoPresupuestoArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const movimientoPresupuesto: IMovimientoPresupuesto = { id: 123 };
          const movimientoPresupuesto2: IMovimientoPresupuesto = { id: 456 };
          expectedResult = service.addMovimientoPresupuestoToCollectionIfMissing([], movimientoPresupuesto, movimientoPresupuesto2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(movimientoPresupuesto);
          expect(expectedResult).toContain(movimientoPresupuesto2);
        });

        it('should accept null and undefined values', () => {
          const movimientoPresupuesto: IMovimientoPresupuesto = { id: 123 };
          expectedResult = service.addMovimientoPresupuestoToCollectionIfMissing([], null, movimientoPresupuesto, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(movimientoPresupuesto);
        });

        it('should return initial array if no MovimientoPresupuesto is added', () => {
          const movimientoPresupuestoCollection: IMovimientoPresupuesto[] = [{ id: 123 }];
          expectedResult = service.addMovimientoPresupuestoToCollectionIfMissing(movimientoPresupuestoCollection, undefined, null);
          expect(expectedResult).toEqual(movimientoPresupuestoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
