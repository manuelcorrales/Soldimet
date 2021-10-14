import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPagoTarjeta, PagoTarjeta } from '../pago-tarjeta.model';

import { PagoTarjetaService } from './pago-tarjeta.service';

describe('Service Tests', () => {
  describe('PagoTarjeta Service', () => {
    let service: PagoTarjetaService;
    let httpMock: HttpTestingController;
    let elemDefault: IPagoTarjeta;
    let expectedResult: IPagoTarjeta | IPagoTarjeta[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PagoTarjetaService);
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

      it('should create a PagoTarjeta', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new PagoTarjeta()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PagoTarjeta', () => {
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

      it('should partial update a PagoTarjeta', () => {
        const patchObject = Object.assign({}, new PagoTarjeta());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PagoTarjeta', () => {
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

      it('should delete a PagoTarjeta', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPagoTarjetaToCollectionIfMissing', () => {
        it('should add a PagoTarjeta to an empty array', () => {
          const pagoTarjeta: IPagoTarjeta = { id: 123 };
          expectedResult = service.addPagoTarjetaToCollectionIfMissing([], pagoTarjeta);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(pagoTarjeta);
        });

        it('should not add a PagoTarjeta to an array that contains it', () => {
          const pagoTarjeta: IPagoTarjeta = { id: 123 };
          const pagoTarjetaCollection: IPagoTarjeta[] = [
            {
              ...pagoTarjeta,
            },
            { id: 456 },
          ];
          expectedResult = service.addPagoTarjetaToCollectionIfMissing(pagoTarjetaCollection, pagoTarjeta);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a PagoTarjeta to an array that doesn't contain it", () => {
          const pagoTarjeta: IPagoTarjeta = { id: 123 };
          const pagoTarjetaCollection: IPagoTarjeta[] = [{ id: 456 }];
          expectedResult = service.addPagoTarjetaToCollectionIfMissing(pagoTarjetaCollection, pagoTarjeta);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(pagoTarjeta);
        });

        it('should add only unique PagoTarjeta to an array', () => {
          const pagoTarjetaArray: IPagoTarjeta[] = [{ id: 123 }, { id: 456 }, { id: 39185 }];
          const pagoTarjetaCollection: IPagoTarjeta[] = [{ id: 123 }];
          expectedResult = service.addPagoTarjetaToCollectionIfMissing(pagoTarjetaCollection, ...pagoTarjetaArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const pagoTarjeta: IPagoTarjeta = { id: 123 };
          const pagoTarjeta2: IPagoTarjeta = { id: 456 };
          expectedResult = service.addPagoTarjetaToCollectionIfMissing([], pagoTarjeta, pagoTarjeta2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(pagoTarjeta);
          expect(expectedResult).toContain(pagoTarjeta2);
        });

        it('should accept null and undefined values', () => {
          const pagoTarjeta: IPagoTarjeta = { id: 123 };
          expectedResult = service.addPagoTarjetaToCollectionIfMissing([], null, pagoTarjeta, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(pagoTarjeta);
        });

        it('should return initial array if no PagoTarjeta is added', () => {
          const pagoTarjetaCollection: IPagoTarjeta[] = [{ id: 123 }];
          expectedResult = service.addPagoTarjetaToCollectionIfMissing(pagoTarjetaCollection, undefined, null);
          expect(expectedResult).toEqual(pagoTarjetaCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
