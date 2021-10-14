import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IPedidoRepuesto, PedidoRepuesto } from '../pedido-repuesto.model';

import { PedidoRepuestoService } from './pedido-repuesto.service';

describe('Service Tests', () => {
  describe('PedidoRepuesto Service', () => {
    let service: PedidoRepuestoService;
    let httpMock: HttpTestingController;
    let elemDefault: IPedidoRepuesto;
    let expectedResult: IPedidoRepuesto | IPedidoRepuesto[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PedidoRepuestoService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        fechaCreacion: currentDate,
        fechaPedido: currentDate,
        fechaRecibo: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaCreacion: currentDate.format(DATE_FORMAT),
            fechaPedido: currentDate.format(DATE_FORMAT),
            fechaRecibo: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PedidoRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaCreacion: currentDate.format(DATE_FORMAT),
            fechaPedido: currentDate.format(DATE_FORMAT),
            fechaRecibo: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaCreacion: currentDate,
            fechaPedido: currentDate,
            fechaRecibo: currentDate,
          },
          returnedFromService
        );

        service.create(new PedidoRepuesto()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PedidoRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fechaCreacion: currentDate.format(DATE_FORMAT),
            fechaPedido: currentDate.format(DATE_FORMAT),
            fechaRecibo: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaCreacion: currentDate,
            fechaPedido: currentDate,
            fechaRecibo: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a PedidoRepuesto', () => {
        const patchObject = Object.assign(
          {
            fechaPedido: currentDate.format(DATE_FORMAT),
          },
          new PedidoRepuesto()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            fechaCreacion: currentDate,
            fechaPedido: currentDate,
            fechaRecibo: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PedidoRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fechaCreacion: currentDate.format(DATE_FORMAT),
            fechaPedido: currentDate.format(DATE_FORMAT),
            fechaRecibo: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaCreacion: currentDate,
            fechaPedido: currentDate,
            fechaRecibo: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PedidoRepuesto', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPedidoRepuestoToCollectionIfMissing', () => {
        it('should add a PedidoRepuesto to an empty array', () => {
          const pedidoRepuesto: IPedidoRepuesto = { id: 123 };
          expectedResult = service.addPedidoRepuestoToCollectionIfMissing([], pedidoRepuesto);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(pedidoRepuesto);
        });

        it('should not add a PedidoRepuesto to an array that contains it', () => {
          const pedidoRepuesto: IPedidoRepuesto = { id: 123 };
          const pedidoRepuestoCollection: IPedidoRepuesto[] = [
            {
              ...pedidoRepuesto,
            },
            { id: 456 },
          ];
          expectedResult = service.addPedidoRepuestoToCollectionIfMissing(pedidoRepuestoCollection, pedidoRepuesto);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a PedidoRepuesto to an array that doesn't contain it", () => {
          const pedidoRepuesto: IPedidoRepuesto = { id: 123 };
          const pedidoRepuestoCollection: IPedidoRepuesto[] = [{ id: 456 }];
          expectedResult = service.addPedidoRepuestoToCollectionIfMissing(pedidoRepuestoCollection, pedidoRepuesto);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(pedidoRepuesto);
        });

        it('should add only unique PedidoRepuesto to an array', () => {
          const pedidoRepuestoArray: IPedidoRepuesto[] = [{ id: 123 }, { id: 456 }, { id: 90194 }];
          const pedidoRepuestoCollection: IPedidoRepuesto[] = [{ id: 123 }];
          expectedResult = service.addPedidoRepuestoToCollectionIfMissing(pedidoRepuestoCollection, ...pedidoRepuestoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const pedidoRepuesto: IPedidoRepuesto = { id: 123 };
          const pedidoRepuesto2: IPedidoRepuesto = { id: 456 };
          expectedResult = service.addPedidoRepuestoToCollectionIfMissing([], pedidoRepuesto, pedidoRepuesto2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(pedidoRepuesto);
          expect(expectedResult).toContain(pedidoRepuesto2);
        });

        it('should accept null and undefined values', () => {
          const pedidoRepuesto: IPedidoRepuesto = { id: 123 };
          expectedResult = service.addPedidoRepuestoToCollectionIfMissing([], null, pedidoRepuesto, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(pedidoRepuesto);
        });

        it('should return initial array if no PedidoRepuesto is added', () => {
          const pedidoRepuestoCollection: IPedidoRepuesto[] = [{ id: 123 }];
          expectedResult = service.addPedidoRepuestoToCollectionIfMissing(pedidoRepuestoCollection, undefined, null);
          expect(expectedResult).toEqual(pedidoRepuestoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
