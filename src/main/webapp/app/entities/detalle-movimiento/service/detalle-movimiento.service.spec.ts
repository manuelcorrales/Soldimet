import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDetalleMovimiento, DetalleMovimiento } from '../detalle-movimiento.model';

import { DetalleMovimientoService } from './detalle-movimiento.service';

describe('Service Tests', () => {
  describe('DetalleMovimiento Service', () => {
    let service: DetalleMovimientoService;
    let httpMock: HttpTestingController;
    let elemDefault: IDetalleMovimiento;
    let expectedResult: IDetalleMovimiento | IDetalleMovimiento[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DetalleMovimientoService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        valorUnitario: 0,
        cantidad: 0,
        descripcion: 'AAAAAAA',
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

      it('should create a DetalleMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DetalleMovimiento()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DetalleMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            valorUnitario: 1,
            cantidad: 1,
            descripcion: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a DetalleMovimiento', () => {
        const patchObject = Object.assign(
          {
            cantidad: 1,
            descripcion: 'BBBBBB',
          },
          new DetalleMovimiento()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DetalleMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            valorUnitario: 1,
            cantidad: 1,
            descripcion: 'BBBBBB',
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

      it('should delete a DetalleMovimiento', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDetalleMovimientoToCollectionIfMissing', () => {
        it('should add a DetalleMovimiento to an empty array', () => {
          const detalleMovimiento: IDetalleMovimiento = { id: 123 };
          expectedResult = service.addDetalleMovimientoToCollectionIfMissing([], detalleMovimiento);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(detalleMovimiento);
        });

        it('should not add a DetalleMovimiento to an array that contains it', () => {
          const detalleMovimiento: IDetalleMovimiento = { id: 123 };
          const detalleMovimientoCollection: IDetalleMovimiento[] = [
            {
              ...detalleMovimiento,
            },
            { id: 456 },
          ];
          expectedResult = service.addDetalleMovimientoToCollectionIfMissing(detalleMovimientoCollection, detalleMovimiento);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a DetalleMovimiento to an array that doesn't contain it", () => {
          const detalleMovimiento: IDetalleMovimiento = { id: 123 };
          const detalleMovimientoCollection: IDetalleMovimiento[] = [{ id: 456 }];
          expectedResult = service.addDetalleMovimientoToCollectionIfMissing(detalleMovimientoCollection, detalleMovimiento);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(detalleMovimiento);
        });

        it('should add only unique DetalleMovimiento to an array', () => {
          const detalleMovimientoArray: IDetalleMovimiento[] = [{ id: 123 }, { id: 456 }, { id: 79520 }];
          const detalleMovimientoCollection: IDetalleMovimiento[] = [{ id: 123 }];
          expectedResult = service.addDetalleMovimientoToCollectionIfMissing(detalleMovimientoCollection, ...detalleMovimientoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const detalleMovimiento: IDetalleMovimiento = { id: 123 };
          const detalleMovimiento2: IDetalleMovimiento = { id: 456 };
          expectedResult = service.addDetalleMovimientoToCollectionIfMissing([], detalleMovimiento, detalleMovimiento2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(detalleMovimiento);
          expect(expectedResult).toContain(detalleMovimiento2);
        });

        it('should accept null and undefined values', () => {
          const detalleMovimiento: IDetalleMovimiento = { id: 123 };
          expectedResult = service.addDetalleMovimientoToCollectionIfMissing([], null, detalleMovimiento, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(detalleMovimiento);
        });

        it('should return initial array if no DetalleMovimiento is added', () => {
          const detalleMovimientoCollection: IDetalleMovimiento[] = [{ id: 123 }];
          expectedResult = service.addDetalleMovimientoToCollectionIfMissing(detalleMovimientoCollection, undefined, null);
          expect(expectedResult).toEqual(detalleMovimientoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
