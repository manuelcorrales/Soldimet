import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMovimientoPedido, MovimientoPedido } from '../movimiento-pedido.model';

import { MovimientoPedidoService } from './movimiento-pedido.service';

describe('Service Tests', () => {
  describe('MovimientoPedido Service', () => {
    let service: MovimientoPedidoService;
    let httpMock: HttpTestingController;
    let elemDefault: IMovimientoPedido;
    let expectedResult: IMovimientoPedido | IMovimientoPedido[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MovimientoPedidoService);
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

      it('should create a MovimientoPedido', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MovimientoPedido()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MovimientoPedido', () => {
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

      it('should partial update a MovimientoPedido', () => {
        const patchObject = Object.assign({}, new MovimientoPedido());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MovimientoPedido', () => {
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

      it('should delete a MovimientoPedido', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMovimientoPedidoToCollectionIfMissing', () => {
        it('should add a MovimientoPedido to an empty array', () => {
          const movimientoPedido: IMovimientoPedido = { id: 123 };
          expectedResult = service.addMovimientoPedidoToCollectionIfMissing([], movimientoPedido);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(movimientoPedido);
        });

        it('should not add a MovimientoPedido to an array that contains it', () => {
          const movimientoPedido: IMovimientoPedido = { id: 123 };
          const movimientoPedidoCollection: IMovimientoPedido[] = [
            {
              ...movimientoPedido,
            },
            { id: 456 },
          ];
          expectedResult = service.addMovimientoPedidoToCollectionIfMissing(movimientoPedidoCollection, movimientoPedido);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a MovimientoPedido to an array that doesn't contain it", () => {
          const movimientoPedido: IMovimientoPedido = { id: 123 };
          const movimientoPedidoCollection: IMovimientoPedido[] = [{ id: 456 }];
          expectedResult = service.addMovimientoPedidoToCollectionIfMissing(movimientoPedidoCollection, movimientoPedido);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(movimientoPedido);
        });

        it('should add only unique MovimientoPedido to an array', () => {
          const movimientoPedidoArray: IMovimientoPedido[] = [{ id: 123 }, { id: 456 }, { id: 92516 }];
          const movimientoPedidoCollection: IMovimientoPedido[] = [{ id: 123 }];
          expectedResult = service.addMovimientoPedidoToCollectionIfMissing(movimientoPedidoCollection, ...movimientoPedidoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const movimientoPedido: IMovimientoPedido = { id: 123 };
          const movimientoPedido2: IMovimientoPedido = { id: 456 };
          expectedResult = service.addMovimientoPedidoToCollectionIfMissing([], movimientoPedido, movimientoPedido2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(movimientoPedido);
          expect(expectedResult).toContain(movimientoPedido2);
        });

        it('should accept null and undefined values', () => {
          const movimientoPedido: IMovimientoPedido = { id: 123 };
          expectedResult = service.addMovimientoPedidoToCollectionIfMissing([], null, movimientoPedido, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(movimientoPedido);
        });

        it('should return initial array if no MovimientoPedido is added', () => {
          const movimientoPedidoCollection: IMovimientoPedido[] = [{ id: 123 }];
          expectedResult = service.addMovimientoPedidoToCollectionIfMissing(movimientoPedidoCollection, undefined, null);
          expect(expectedResult).toEqual(movimientoPedidoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
