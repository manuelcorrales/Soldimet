import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IPresupuesto, Presupuesto } from '../presupuesto.model';

import { PresupuestoService } from './presupuesto.service';

describe('Service Tests', () => {
  describe('Presupuesto Service', () => {
    let service: PresupuestoService;
    let httpMock: HttpTestingController;
    let elemDefault: IPresupuesto;
    let expectedResult: IPresupuesto | IPresupuesto[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PresupuestoService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        descripcionDescuento: 'AAAAAAA',
        descuento: 0,
        fechaCreacion: currentDate,
        fechaAceptado: currentDate,
        fechaEntregado: currentDate,
        importeTotal: 0,
        observaciones: 'AAAAAAA',
        soldadura: false,
        modelo: false,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaCreacion: currentDate.format(DATE_FORMAT),
            fechaAceptado: currentDate.format(DATE_FORMAT),
            fechaEntregado: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Presupuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaCreacion: currentDate.format(DATE_FORMAT),
            fechaAceptado: currentDate.format(DATE_FORMAT),
            fechaEntregado: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaCreacion: currentDate,
            fechaAceptado: currentDate,
            fechaEntregado: currentDate,
          },
          returnedFromService
        );

        service.create(new Presupuesto()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Presupuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            descripcionDescuento: 'BBBBBB',
            descuento: 1,
            fechaCreacion: currentDate.format(DATE_FORMAT),
            fechaAceptado: currentDate.format(DATE_FORMAT),
            fechaEntregado: currentDate.format(DATE_FORMAT),
            importeTotal: 1,
            observaciones: 'BBBBBB',
            soldadura: true,
            modelo: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaCreacion: currentDate,
            fechaAceptado: currentDate,
            fechaEntregado: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Presupuesto', () => {
        const patchObject = Object.assign(
          {
            descripcionDescuento: 'BBBBBB',
            fechaEntregado: currentDate.format(DATE_FORMAT),
            importeTotal: 1,
            soldadura: true,
            modelo: true,
          },
          new Presupuesto()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            fechaCreacion: currentDate,
            fechaAceptado: currentDate,
            fechaEntregado: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Presupuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            descripcionDescuento: 'BBBBBB',
            descuento: 1,
            fechaCreacion: currentDate.format(DATE_FORMAT),
            fechaAceptado: currentDate.format(DATE_FORMAT),
            fechaEntregado: currentDate.format(DATE_FORMAT),
            importeTotal: 1,
            observaciones: 'BBBBBB',
            soldadura: true,
            modelo: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaCreacion: currentDate,
            fechaAceptado: currentDate,
            fechaEntregado: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Presupuesto', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPresupuestoToCollectionIfMissing', () => {
        it('should add a Presupuesto to an empty array', () => {
          const presupuesto: IPresupuesto = { id: 123 };
          expectedResult = service.addPresupuestoToCollectionIfMissing([], presupuesto);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(presupuesto);
        });

        it('should not add a Presupuesto to an array that contains it', () => {
          const presupuesto: IPresupuesto = { id: 123 };
          const presupuestoCollection: IPresupuesto[] = [
            {
              ...presupuesto,
            },
            { id: 456 },
          ];
          expectedResult = service.addPresupuestoToCollectionIfMissing(presupuestoCollection, presupuesto);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Presupuesto to an array that doesn't contain it", () => {
          const presupuesto: IPresupuesto = { id: 123 };
          const presupuestoCollection: IPresupuesto[] = [{ id: 456 }];
          expectedResult = service.addPresupuestoToCollectionIfMissing(presupuestoCollection, presupuesto);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(presupuesto);
        });

        it('should add only unique Presupuesto to an array', () => {
          const presupuestoArray: IPresupuesto[] = [{ id: 123 }, { id: 456 }, { id: 78862 }];
          const presupuestoCollection: IPresupuesto[] = [{ id: 123 }];
          expectedResult = service.addPresupuestoToCollectionIfMissing(presupuestoCollection, ...presupuestoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const presupuesto: IPresupuesto = { id: 123 };
          const presupuesto2: IPresupuesto = { id: 456 };
          expectedResult = service.addPresupuestoToCollectionIfMissing([], presupuesto, presupuesto2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(presupuesto);
          expect(expectedResult).toContain(presupuesto2);
        });

        it('should accept null and undefined values', () => {
          const presupuesto: IPresupuesto = { id: 123 };
          expectedResult = service.addPresupuestoToCollectionIfMissing([], null, presupuesto, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(presupuesto);
        });

        it('should return initial array if no Presupuesto is added', () => {
          const presupuestoCollection: IPresupuesto[] = [{ id: 123 }];
          expectedResult = service.addPresupuestoToCollectionIfMissing(presupuestoCollection, undefined, null);
          expect(expectedResult).toEqual(presupuestoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
