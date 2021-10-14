import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IPrecioRepuesto, PrecioRepuesto } from '../precio-repuesto.model';

import { PrecioRepuestoService } from './precio-repuesto.service';

describe('Service Tests', () => {
  describe('PrecioRepuesto Service', () => {
    let service: PrecioRepuestoService;
    let httpMock: HttpTestingController;
    let elemDefault: IPrecioRepuesto;
    let expectedResult: IPrecioRepuesto | IPrecioRepuesto[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PrecioRepuestoService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        fecha: currentDate,
        precioPrivado: 0,
        precioPublico: 0,
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

      it('should create a PrecioRepuesto', () => {
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

        service.create(new PrecioRepuesto()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PrecioRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fecha: currentDate.format(DATE_FORMAT),
            precioPrivado: 1,
            precioPublico: 1,
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

      it('should partial update a PrecioRepuesto', () => {
        const patchObject = Object.assign(
          {
            precioPublico: 1,
          },
          new PrecioRepuesto()
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

      it('should return a list of PrecioRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fecha: currentDate.format(DATE_FORMAT),
            precioPrivado: 1,
            precioPublico: 1,
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

      it('should delete a PrecioRepuesto', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPrecioRepuestoToCollectionIfMissing', () => {
        it('should add a PrecioRepuesto to an empty array', () => {
          const precioRepuesto: IPrecioRepuesto = { id: 123 };
          expectedResult = service.addPrecioRepuestoToCollectionIfMissing([], precioRepuesto);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(precioRepuesto);
        });

        it('should not add a PrecioRepuesto to an array that contains it', () => {
          const precioRepuesto: IPrecioRepuesto = { id: 123 };
          const precioRepuestoCollection: IPrecioRepuesto[] = [
            {
              ...precioRepuesto,
            },
            { id: 456 },
          ];
          expectedResult = service.addPrecioRepuestoToCollectionIfMissing(precioRepuestoCollection, precioRepuesto);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a PrecioRepuesto to an array that doesn't contain it", () => {
          const precioRepuesto: IPrecioRepuesto = { id: 123 };
          const precioRepuestoCollection: IPrecioRepuesto[] = [{ id: 456 }];
          expectedResult = service.addPrecioRepuestoToCollectionIfMissing(precioRepuestoCollection, precioRepuesto);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(precioRepuesto);
        });

        it('should add only unique PrecioRepuesto to an array', () => {
          const precioRepuestoArray: IPrecioRepuesto[] = [{ id: 123 }, { id: 456 }, { id: 64740 }];
          const precioRepuestoCollection: IPrecioRepuesto[] = [{ id: 123 }];
          expectedResult = service.addPrecioRepuestoToCollectionIfMissing(precioRepuestoCollection, ...precioRepuestoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const precioRepuesto: IPrecioRepuesto = { id: 123 };
          const precioRepuesto2: IPrecioRepuesto = { id: 456 };
          expectedResult = service.addPrecioRepuestoToCollectionIfMissing([], precioRepuesto, precioRepuesto2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(precioRepuesto);
          expect(expectedResult).toContain(precioRepuesto2);
        });

        it('should accept null and undefined values', () => {
          const precioRepuesto: IPrecioRepuesto = { id: 123 };
          expectedResult = service.addPrecioRepuestoToCollectionIfMissing([], null, precioRepuesto, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(precioRepuesto);
        });

        it('should return initial array if no PrecioRepuesto is added', () => {
          const precioRepuestoCollection: IPrecioRepuesto[] = [{ id: 123 }];
          expectedResult = service.addPrecioRepuestoToCollectionIfMissing(precioRepuestoCollection, undefined, null);
          expect(expectedResult).toEqual(precioRepuestoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
