import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDetallePedido, DetallePedido } from '../detalle-pedido.model';

import { DetallePedidoService } from './detalle-pedido.service';

describe('Service Tests', () => {
  describe('DetallePedido Service', () => {
    let service: DetallePedidoService;
    let httpMock: HttpTestingController;
    let elemDefault: IDetallePedido;
    let expectedResult: IDetallePedido | IDetallePedido[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DetallePedidoService);
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

      it('should create a DetallePedido', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DetallePedido()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DetallePedido', () => {
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

      it('should partial update a DetallePedido', () => {
        const patchObject = Object.assign({}, new DetallePedido());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DetallePedido', () => {
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

      it('should delete a DetallePedido', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDetallePedidoToCollectionIfMissing', () => {
        it('should add a DetallePedido to an empty array', () => {
          const detallePedido: IDetallePedido = { id: 123 };
          expectedResult = service.addDetallePedidoToCollectionIfMissing([], detallePedido);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(detallePedido);
        });

        it('should not add a DetallePedido to an array that contains it', () => {
          const detallePedido: IDetallePedido = { id: 123 };
          const detallePedidoCollection: IDetallePedido[] = [
            {
              ...detallePedido,
            },
            { id: 456 },
          ];
          expectedResult = service.addDetallePedidoToCollectionIfMissing(detallePedidoCollection, detallePedido);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a DetallePedido to an array that doesn't contain it", () => {
          const detallePedido: IDetallePedido = { id: 123 };
          const detallePedidoCollection: IDetallePedido[] = [{ id: 456 }];
          expectedResult = service.addDetallePedidoToCollectionIfMissing(detallePedidoCollection, detallePedido);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(detallePedido);
        });

        it('should add only unique DetallePedido to an array', () => {
          const detallePedidoArray: IDetallePedido[] = [{ id: 123 }, { id: 456 }, { id: 63013 }];
          const detallePedidoCollection: IDetallePedido[] = [{ id: 123 }];
          expectedResult = service.addDetallePedidoToCollectionIfMissing(detallePedidoCollection, ...detallePedidoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const detallePedido: IDetallePedido = { id: 123 };
          const detallePedido2: IDetallePedido = { id: 456 };
          expectedResult = service.addDetallePedidoToCollectionIfMissing([], detallePedido, detallePedido2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(detallePedido);
          expect(expectedResult).toContain(detallePedido2);
        });

        it('should accept null and undefined values', () => {
          const detallePedido: IDetallePedido = { id: 123 };
          expectedResult = service.addDetallePedidoToCollectionIfMissing([], null, detallePedido, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(detallePedido);
        });

        it('should return initial array if no DetallePedido is added', () => {
          const detallePedidoCollection: IDetallePedido[] = [{ id: 123 }];
          expectedResult = service.addDetallePedidoToCollectionIfMissing(detallePedidoCollection, undefined, null);
          expect(expectedResult).toEqual(detallePedidoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
