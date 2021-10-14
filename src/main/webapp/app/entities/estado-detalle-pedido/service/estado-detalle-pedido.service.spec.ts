import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEstadoDetallePedido, EstadoDetallePedido } from '../estado-detalle-pedido.model';

import { EstadoDetallePedidoService } from './estado-detalle-pedido.service';

describe('Service Tests', () => {
  describe('EstadoDetallePedido Service', () => {
    let service: EstadoDetallePedidoService;
    let httpMock: HttpTestingController;
    let elemDefault: IEstadoDetallePedido;
    let expectedResult: IEstadoDetallePedido | IEstadoDetallePedido[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EstadoDetallePedidoService);
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

      it('should create a EstadoDetallePedido', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EstadoDetallePedido()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EstadoDetallePedido', () => {
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

      it('should partial update a EstadoDetallePedido', () => {
        const patchObject = Object.assign(
          {
            nombreEstado: 'BBBBBB',
          },
          new EstadoDetallePedido()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EstadoDetallePedido', () => {
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

      it('should delete a EstadoDetallePedido', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEstadoDetallePedidoToCollectionIfMissing', () => {
        it('should add a EstadoDetallePedido to an empty array', () => {
          const estadoDetallePedido: IEstadoDetallePedido = { id: 123 };
          expectedResult = service.addEstadoDetallePedidoToCollectionIfMissing([], estadoDetallePedido);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoDetallePedido);
        });

        it('should not add a EstadoDetallePedido to an array that contains it', () => {
          const estadoDetallePedido: IEstadoDetallePedido = { id: 123 };
          const estadoDetallePedidoCollection: IEstadoDetallePedido[] = [
            {
              ...estadoDetallePedido,
            },
            { id: 456 },
          ];
          expectedResult = service.addEstadoDetallePedidoToCollectionIfMissing(estadoDetallePedidoCollection, estadoDetallePedido);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EstadoDetallePedido to an array that doesn't contain it", () => {
          const estadoDetallePedido: IEstadoDetallePedido = { id: 123 };
          const estadoDetallePedidoCollection: IEstadoDetallePedido[] = [{ id: 456 }];
          expectedResult = service.addEstadoDetallePedidoToCollectionIfMissing(estadoDetallePedidoCollection, estadoDetallePedido);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoDetallePedido);
        });

        it('should add only unique EstadoDetallePedido to an array', () => {
          const estadoDetallePedidoArray: IEstadoDetallePedido[] = [{ id: 123 }, { id: 456 }, { id: 89695 }];
          const estadoDetallePedidoCollection: IEstadoDetallePedido[] = [{ id: 123 }];
          expectedResult = service.addEstadoDetallePedidoToCollectionIfMissing(estadoDetallePedidoCollection, ...estadoDetallePedidoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const estadoDetallePedido: IEstadoDetallePedido = { id: 123 };
          const estadoDetallePedido2: IEstadoDetallePedido = { id: 456 };
          expectedResult = service.addEstadoDetallePedidoToCollectionIfMissing([], estadoDetallePedido, estadoDetallePedido2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoDetallePedido);
          expect(expectedResult).toContain(estadoDetallePedido2);
        });

        it('should accept null and undefined values', () => {
          const estadoDetallePedido: IEstadoDetallePedido = { id: 123 };
          expectedResult = service.addEstadoDetallePedidoToCollectionIfMissing([], null, estadoDetallePedido, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoDetallePedido);
        });

        it('should return initial array if no EstadoDetallePedido is added', () => {
          const estadoDetallePedidoCollection: IEstadoDetallePedido[] = [{ id: 123 }];
          expectedResult = service.addEstadoDetallePedidoToCollectionIfMissing(estadoDetallePedidoCollection, undefined, null);
          expect(expectedResult).toEqual(estadoDetallePedidoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
