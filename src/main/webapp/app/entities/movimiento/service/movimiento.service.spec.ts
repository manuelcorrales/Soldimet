import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IMovimiento, Movimiento } from '../movimiento.model';

import { MovimientoService } from './movimiento.service';

describe('Service Tests', () => {
  describe('Movimiento Service', () => {
    let service: MovimientoService;
    let httpMock: HttpTestingController;
    let elemDefault: IMovimiento;
    let expectedResult: IMovimiento | IMovimiento[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MovimientoService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        fecha: currentDate,
        importe: 0,
        descuento: 0,
        observaciones: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Movimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fecha: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );

        service.create(new Movimiento()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Movimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fecha: currentDate.format(DATE_FORMAT),
            importe: 1,
            descuento: 1,
            observaciones: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Movimiento', () => {
        const patchObject = Object.assign(
          {
            descuento: 1,
          },
          new Movimiento()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Movimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fecha: currentDate.format(DATE_FORMAT),
            importe: 1,
            descuento: 1,
            observaciones: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Movimiento', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMovimientoToCollectionIfMissing', () => {
        it('should add a Movimiento to an empty array', () => {
          const movimiento: IMovimiento = { id: 123 };
          expectedResult = service.addMovimientoToCollectionIfMissing([], movimiento);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(movimiento);
        });

        it('should not add a Movimiento to an array that contains it', () => {
          const movimiento: IMovimiento = { id: 123 };
          const movimientoCollection: IMovimiento[] = [
            {
              ...movimiento,
            },
            { id: 456 },
          ];
          expectedResult = service.addMovimientoToCollectionIfMissing(movimientoCollection, movimiento);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Movimiento to an array that doesn't contain it", () => {
          const movimiento: IMovimiento = { id: 123 };
          const movimientoCollection: IMovimiento[] = [{ id: 456 }];
          expectedResult = service.addMovimientoToCollectionIfMissing(movimientoCollection, movimiento);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(movimiento);
        });

        it('should add only unique Movimiento to an array', () => {
          const movimientoArray: IMovimiento[] = [{ id: 123 }, { id: 456 }, { id: 44570 }];
          const movimientoCollection: IMovimiento[] = [{ id: 123 }];
          expectedResult = service.addMovimientoToCollectionIfMissing(movimientoCollection, ...movimientoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const movimiento: IMovimiento = { id: 123 };
          const movimiento2: IMovimiento = { id: 456 };
          expectedResult = service.addMovimientoToCollectionIfMissing([], movimiento, movimiento2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(movimiento);
          expect(expectedResult).toContain(movimiento2);
        });

        it('should accept null and undefined values', () => {
          const movimiento: IMovimiento = { id: 123 };
          expectedResult = service.addMovimientoToCollectionIfMissing([], null, movimiento, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(movimiento);
        });

        it('should return initial array if no Movimiento is added', () => {
          const movimientoCollection: IMovimiento[] = [{ id: 123 }];
          expectedResult = service.addMovimientoToCollectionIfMissing(movimientoCollection, undefined, null);
          expect(expectedResult).toEqual(movimientoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
