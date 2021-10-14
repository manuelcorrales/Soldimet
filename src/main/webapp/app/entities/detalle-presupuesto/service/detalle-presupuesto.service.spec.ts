import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDetallePresupuesto, DetallePresupuesto } from '../detalle-presupuesto.model';

import { DetallePresupuestoService } from './detalle-presupuesto.service';

describe('Service Tests', () => {
  describe('DetallePresupuesto Service', () => {
    let service: DetallePresupuestoService;
    let httpMock: HttpTestingController;
    let elemDefault: IDetallePresupuesto;
    let expectedResult: IDetallePresupuesto | IDetallePresupuesto[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DetallePresupuestoService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        importe: 0,
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

      it('should create a DetallePresupuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DetallePresupuesto()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DetallePresupuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            importe: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a DetallePresupuesto', () => {
        const patchObject = Object.assign({}, new DetallePresupuesto());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DetallePresupuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            importe: 1,
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

      it('should delete a DetallePresupuesto', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDetallePresupuestoToCollectionIfMissing', () => {
        it('should add a DetallePresupuesto to an empty array', () => {
          const detallePresupuesto: IDetallePresupuesto = { id: 123 };
          expectedResult = service.addDetallePresupuestoToCollectionIfMissing([], detallePresupuesto);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(detallePresupuesto);
        });

        it('should not add a DetallePresupuesto to an array that contains it', () => {
          const detallePresupuesto: IDetallePresupuesto = { id: 123 };
          const detallePresupuestoCollection: IDetallePresupuesto[] = [
            {
              ...detallePresupuesto,
            },
            { id: 456 },
          ];
          expectedResult = service.addDetallePresupuestoToCollectionIfMissing(detallePresupuestoCollection, detallePresupuesto);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a DetallePresupuesto to an array that doesn't contain it", () => {
          const detallePresupuesto: IDetallePresupuesto = { id: 123 };
          const detallePresupuestoCollection: IDetallePresupuesto[] = [{ id: 456 }];
          expectedResult = service.addDetallePresupuestoToCollectionIfMissing(detallePresupuestoCollection, detallePresupuesto);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(detallePresupuesto);
        });

        it('should add only unique DetallePresupuesto to an array', () => {
          const detallePresupuestoArray: IDetallePresupuesto[] = [{ id: 123 }, { id: 456 }, { id: 46245 }];
          const detallePresupuestoCollection: IDetallePresupuesto[] = [{ id: 123 }];
          expectedResult = service.addDetallePresupuestoToCollectionIfMissing(detallePresupuestoCollection, ...detallePresupuestoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const detallePresupuesto: IDetallePresupuesto = { id: 123 };
          const detallePresupuesto2: IDetallePresupuesto = { id: 456 };
          expectedResult = service.addDetallePresupuestoToCollectionIfMissing([], detallePresupuesto, detallePresupuesto2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(detallePresupuesto);
          expect(expectedResult).toContain(detallePresupuesto2);
        });

        it('should accept null and undefined values', () => {
          const detallePresupuesto: IDetallePresupuesto = { id: 123 };
          expectedResult = service.addDetallePresupuestoToCollectionIfMissing([], null, detallePresupuesto, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(detallePresupuesto);
        });

        it('should return initial array if no DetallePresupuesto is added', () => {
          const detallePresupuestoCollection: IDetallePresupuesto[] = [{ id: 123 }];
          expectedResult = service.addDetallePresupuestoToCollectionIfMissing(detallePresupuestoCollection, undefined, null);
          expect(expectedResult).toEqual(detallePresupuestoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
