import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IHistorialPrecio, HistorialPrecio } from '../historial-precio.model';

import { HistorialPrecioService } from './historial-precio.service';

describe('Service Tests', () => {
  describe('HistorialPrecio Service', () => {
    let service: HistorialPrecioService;
    let httpMock: HttpTestingController;
    let elemDefault: IHistorialPrecio;
    let expectedResult: IHistorialPrecio | IHistorialPrecio[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(HistorialPrecioService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        fechaHistorial: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaHistorial: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a HistorialPrecio', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaHistorial: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaHistorial: currentDate,
          },
          returnedFromService
        );

        service.create(new HistorialPrecio()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a HistorialPrecio', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fechaHistorial: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaHistorial: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a HistorialPrecio', () => {
        const patchObject = Object.assign({}, new HistorialPrecio());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            fechaHistorial: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of HistorialPrecio', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fechaHistorial: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaHistorial: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a HistorialPrecio', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addHistorialPrecioToCollectionIfMissing', () => {
        it('should add a HistorialPrecio to an empty array', () => {
          const historialPrecio: IHistorialPrecio = { id: 123 };
          expectedResult = service.addHistorialPrecioToCollectionIfMissing([], historialPrecio);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(historialPrecio);
        });

        it('should not add a HistorialPrecio to an array that contains it', () => {
          const historialPrecio: IHistorialPrecio = { id: 123 };
          const historialPrecioCollection: IHistorialPrecio[] = [
            {
              ...historialPrecio,
            },
            { id: 456 },
          ];
          expectedResult = service.addHistorialPrecioToCollectionIfMissing(historialPrecioCollection, historialPrecio);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a HistorialPrecio to an array that doesn't contain it", () => {
          const historialPrecio: IHistorialPrecio = { id: 123 };
          const historialPrecioCollection: IHistorialPrecio[] = [{ id: 456 }];
          expectedResult = service.addHistorialPrecioToCollectionIfMissing(historialPrecioCollection, historialPrecio);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(historialPrecio);
        });

        it('should add only unique HistorialPrecio to an array', () => {
          const historialPrecioArray: IHistorialPrecio[] = [{ id: 123 }, { id: 456 }, { id: 61297 }];
          const historialPrecioCollection: IHistorialPrecio[] = [{ id: 123 }];
          expectedResult = service.addHistorialPrecioToCollectionIfMissing(historialPrecioCollection, ...historialPrecioArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const historialPrecio: IHistorialPrecio = { id: 123 };
          const historialPrecio2: IHistorialPrecio = { id: 456 };
          expectedResult = service.addHistorialPrecioToCollectionIfMissing([], historialPrecio, historialPrecio2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(historialPrecio);
          expect(expectedResult).toContain(historialPrecio2);
        });

        it('should accept null and undefined values', () => {
          const historialPrecio: IHistorialPrecio = { id: 123 };
          expectedResult = service.addHistorialPrecioToCollectionIfMissing([], null, historialPrecio, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(historialPrecio);
        });

        it('should return initial array if no HistorialPrecio is added', () => {
          const historialPrecioCollection: IHistorialPrecio[] = [{ id: 123 }];
          expectedResult = service.addHistorialPrecioToCollectionIfMissing(historialPrecioCollection, undefined, null);
          expect(expectedResult).toEqual(historialPrecioCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
