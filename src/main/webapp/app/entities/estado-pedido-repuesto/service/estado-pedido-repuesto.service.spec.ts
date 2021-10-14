import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEstadoPedidoRepuesto, EstadoPedidoRepuesto } from '../estado-pedido-repuesto.model';

import { EstadoPedidoRepuestoService } from './estado-pedido-repuesto.service';

describe('Service Tests', () => {
  describe('EstadoPedidoRepuesto Service', () => {
    let service: EstadoPedidoRepuestoService;
    let httpMock: HttpTestingController;
    let elemDefault: IEstadoPedidoRepuesto;
    let expectedResult: IEstadoPedidoRepuesto | IEstadoPedidoRepuesto[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EstadoPedidoRepuestoService);
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

      it('should create a EstadoPedidoRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EstadoPedidoRepuesto()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EstadoPedidoRepuesto', () => {
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

      it('should partial update a EstadoPedidoRepuesto', () => {
        const patchObject = Object.assign({}, new EstadoPedidoRepuesto());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EstadoPedidoRepuesto', () => {
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

      it('should delete a EstadoPedidoRepuesto', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEstadoPedidoRepuestoToCollectionIfMissing', () => {
        it('should add a EstadoPedidoRepuesto to an empty array', () => {
          const estadoPedidoRepuesto: IEstadoPedidoRepuesto = { id: 123 };
          expectedResult = service.addEstadoPedidoRepuestoToCollectionIfMissing([], estadoPedidoRepuesto);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoPedidoRepuesto);
        });

        it('should not add a EstadoPedidoRepuesto to an array that contains it', () => {
          const estadoPedidoRepuesto: IEstadoPedidoRepuesto = { id: 123 };
          const estadoPedidoRepuestoCollection: IEstadoPedidoRepuesto[] = [
            {
              ...estadoPedidoRepuesto,
            },
            { id: 456 },
          ];
          expectedResult = service.addEstadoPedidoRepuestoToCollectionIfMissing(estadoPedidoRepuestoCollection, estadoPedidoRepuesto);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EstadoPedidoRepuesto to an array that doesn't contain it", () => {
          const estadoPedidoRepuesto: IEstadoPedidoRepuesto = { id: 123 };
          const estadoPedidoRepuestoCollection: IEstadoPedidoRepuesto[] = [{ id: 456 }];
          expectedResult = service.addEstadoPedidoRepuestoToCollectionIfMissing(estadoPedidoRepuestoCollection, estadoPedidoRepuesto);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoPedidoRepuesto);
        });

        it('should add only unique EstadoPedidoRepuesto to an array', () => {
          const estadoPedidoRepuestoArray: IEstadoPedidoRepuesto[] = [{ id: 123 }, { id: 456 }, { id: 30201 }];
          const estadoPedidoRepuestoCollection: IEstadoPedidoRepuesto[] = [{ id: 123 }];
          expectedResult = service.addEstadoPedidoRepuestoToCollectionIfMissing(
            estadoPedidoRepuestoCollection,
            ...estadoPedidoRepuestoArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const estadoPedidoRepuesto: IEstadoPedidoRepuesto = { id: 123 };
          const estadoPedidoRepuesto2: IEstadoPedidoRepuesto = { id: 456 };
          expectedResult = service.addEstadoPedidoRepuestoToCollectionIfMissing([], estadoPedidoRepuesto, estadoPedidoRepuesto2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoPedidoRepuesto);
          expect(expectedResult).toContain(estadoPedidoRepuesto2);
        });

        it('should accept null and undefined values', () => {
          const estadoPedidoRepuesto: IEstadoPedidoRepuesto = { id: 123 };
          expectedResult = service.addEstadoPedidoRepuestoToCollectionIfMissing([], null, estadoPedidoRepuesto, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoPedidoRepuesto);
        });

        it('should return initial array if no EstadoPedidoRepuesto is added', () => {
          const estadoPedidoRepuestoCollection: IEstadoPedidoRepuesto[] = [{ id: 123 }];
          expectedResult = service.addEstadoPedidoRepuestoToCollectionIfMissing(estadoPedidoRepuestoCollection, undefined, null);
          expect(expectedResult).toEqual(estadoPedidoRepuestoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
