import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IListaPrecioDesdeHasta, ListaPrecioDesdeHasta } from '../lista-precio-desde-hasta.model';

import { ListaPrecioDesdeHastaService } from './lista-precio-desde-hasta.service';

describe('Service Tests', () => {
  describe('ListaPrecioDesdeHasta Service', () => {
    let service: ListaPrecioDesdeHastaService;
    let httpMock: HttpTestingController;
    let elemDefault: IListaPrecioDesdeHasta;
    let expectedResult: IListaPrecioDesdeHasta | IListaPrecioDesdeHasta[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ListaPrecioDesdeHastaService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        fechaDesde: currentDate,
        fechaHasta: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaDesde: currentDate.format(DATE_FORMAT),
            fechaHasta: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ListaPrecioDesdeHasta', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaDesde: currentDate.format(DATE_FORMAT),
            fechaHasta: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaDesde: currentDate,
            fechaHasta: currentDate,
          },
          returnedFromService
        );

        service.create(new ListaPrecioDesdeHasta()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ListaPrecioDesdeHasta', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fechaDesde: currentDate.format(DATE_FORMAT),
            fechaHasta: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaDesde: currentDate,
            fechaHasta: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a ListaPrecioDesdeHasta', () => {
        const patchObject = Object.assign(
          {
            fechaDesde: currentDate.format(DATE_FORMAT),
          },
          new ListaPrecioDesdeHasta()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            fechaDesde: currentDate,
            fechaHasta: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ListaPrecioDesdeHasta', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fechaDesde: currentDate.format(DATE_FORMAT),
            fechaHasta: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaDesde: currentDate,
            fechaHasta: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ListaPrecioDesdeHasta', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addListaPrecioDesdeHastaToCollectionIfMissing', () => {
        it('should add a ListaPrecioDesdeHasta to an empty array', () => {
          const listaPrecioDesdeHasta: IListaPrecioDesdeHasta = { id: 123 };
          expectedResult = service.addListaPrecioDesdeHastaToCollectionIfMissing([], listaPrecioDesdeHasta);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(listaPrecioDesdeHasta);
        });

        it('should not add a ListaPrecioDesdeHasta to an array that contains it', () => {
          const listaPrecioDesdeHasta: IListaPrecioDesdeHasta = { id: 123 };
          const listaPrecioDesdeHastaCollection: IListaPrecioDesdeHasta[] = [
            {
              ...listaPrecioDesdeHasta,
            },
            { id: 456 },
          ];
          expectedResult = service.addListaPrecioDesdeHastaToCollectionIfMissing(listaPrecioDesdeHastaCollection, listaPrecioDesdeHasta);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ListaPrecioDesdeHasta to an array that doesn't contain it", () => {
          const listaPrecioDesdeHasta: IListaPrecioDesdeHasta = { id: 123 };
          const listaPrecioDesdeHastaCollection: IListaPrecioDesdeHasta[] = [{ id: 456 }];
          expectedResult = service.addListaPrecioDesdeHastaToCollectionIfMissing(listaPrecioDesdeHastaCollection, listaPrecioDesdeHasta);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(listaPrecioDesdeHasta);
        });

        it('should add only unique ListaPrecioDesdeHasta to an array', () => {
          const listaPrecioDesdeHastaArray: IListaPrecioDesdeHasta[] = [{ id: 123 }, { id: 456 }, { id: 70859 }];
          const listaPrecioDesdeHastaCollection: IListaPrecioDesdeHasta[] = [{ id: 123 }];
          expectedResult = service.addListaPrecioDesdeHastaToCollectionIfMissing(
            listaPrecioDesdeHastaCollection,
            ...listaPrecioDesdeHastaArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const listaPrecioDesdeHasta: IListaPrecioDesdeHasta = { id: 123 };
          const listaPrecioDesdeHasta2: IListaPrecioDesdeHasta = { id: 456 };
          expectedResult = service.addListaPrecioDesdeHastaToCollectionIfMissing([], listaPrecioDesdeHasta, listaPrecioDesdeHasta2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(listaPrecioDesdeHasta);
          expect(expectedResult).toContain(listaPrecioDesdeHasta2);
        });

        it('should accept null and undefined values', () => {
          const listaPrecioDesdeHasta: IListaPrecioDesdeHasta = { id: 123 };
          expectedResult = service.addListaPrecioDesdeHastaToCollectionIfMissing([], null, listaPrecioDesdeHasta, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(listaPrecioDesdeHasta);
        });

        it('should return initial array if no ListaPrecioDesdeHasta is added', () => {
          const listaPrecioDesdeHastaCollection: IListaPrecioDesdeHasta[] = [{ id: 123 }];
          expectedResult = service.addListaPrecioDesdeHastaToCollectionIfMissing(listaPrecioDesdeHastaCollection, undefined, null);
          expect(expectedResult).toEqual(listaPrecioDesdeHastaCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
