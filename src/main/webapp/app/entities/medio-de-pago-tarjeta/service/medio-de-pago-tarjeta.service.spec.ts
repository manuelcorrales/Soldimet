import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMedioDePagoTarjeta, MedioDePagoTarjeta } from '../medio-de-pago-tarjeta.model';

import { MedioDePagoTarjetaService } from './medio-de-pago-tarjeta.service';

describe('Service Tests', () => {
  describe('MedioDePagoTarjeta Service', () => {
    let service: MedioDePagoTarjetaService;
    let httpMock: HttpTestingController;
    let elemDefault: IMedioDePagoTarjeta;
    let expectedResult: IMedioDePagoTarjeta | IMedioDePagoTarjeta[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MedioDePagoTarjetaService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        ultimos4: 'AAAAAAA',
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

      it('should create a MedioDePagoTarjeta', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MedioDePagoTarjeta()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MedioDePagoTarjeta', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            ultimos4: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a MedioDePagoTarjeta', () => {
        const patchObject = Object.assign(
          {
            ultimos4: 'BBBBBB',
          },
          new MedioDePagoTarjeta()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MedioDePagoTarjeta', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            ultimos4: 'BBBBBB',
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

      it('should delete a MedioDePagoTarjeta', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMedioDePagoTarjetaToCollectionIfMissing', () => {
        it('should add a MedioDePagoTarjeta to an empty array', () => {
          const medioDePagoTarjeta: IMedioDePagoTarjeta = { id: 123 };
          expectedResult = service.addMedioDePagoTarjetaToCollectionIfMissing([], medioDePagoTarjeta);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(medioDePagoTarjeta);
        });

        it('should not add a MedioDePagoTarjeta to an array that contains it', () => {
          const medioDePagoTarjeta: IMedioDePagoTarjeta = { id: 123 };
          const medioDePagoTarjetaCollection: IMedioDePagoTarjeta[] = [
            {
              ...medioDePagoTarjeta,
            },
            { id: 456 },
          ];
          expectedResult = service.addMedioDePagoTarjetaToCollectionIfMissing(medioDePagoTarjetaCollection, medioDePagoTarjeta);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a MedioDePagoTarjeta to an array that doesn't contain it", () => {
          const medioDePagoTarjeta: IMedioDePagoTarjeta = { id: 123 };
          const medioDePagoTarjetaCollection: IMedioDePagoTarjeta[] = [{ id: 456 }];
          expectedResult = service.addMedioDePagoTarjetaToCollectionIfMissing(medioDePagoTarjetaCollection, medioDePagoTarjeta);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(medioDePagoTarjeta);
        });

        it('should add only unique MedioDePagoTarjeta to an array', () => {
          const medioDePagoTarjetaArray: IMedioDePagoTarjeta[] = [{ id: 123 }, { id: 456 }, { id: 59407 }];
          const medioDePagoTarjetaCollection: IMedioDePagoTarjeta[] = [{ id: 123 }];
          expectedResult = service.addMedioDePagoTarjetaToCollectionIfMissing(medioDePagoTarjetaCollection, ...medioDePagoTarjetaArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const medioDePagoTarjeta: IMedioDePagoTarjeta = { id: 123 };
          const medioDePagoTarjeta2: IMedioDePagoTarjeta = { id: 456 };
          expectedResult = service.addMedioDePagoTarjetaToCollectionIfMissing([], medioDePagoTarjeta, medioDePagoTarjeta2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(medioDePagoTarjeta);
          expect(expectedResult).toContain(medioDePagoTarjeta2);
        });

        it('should accept null and undefined values', () => {
          const medioDePagoTarjeta: IMedioDePagoTarjeta = { id: 123 };
          expectedResult = service.addMedioDePagoTarjetaToCollectionIfMissing([], null, medioDePagoTarjeta, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(medioDePagoTarjeta);
        });

        it('should return initial array if no MedioDePagoTarjeta is added', () => {
          const medioDePagoTarjetaCollection: IMedioDePagoTarjeta[] = [{ id: 123 }];
          expectedResult = service.addMedioDePagoTarjetaToCollectionIfMissing(medioDePagoTarjetaCollection, undefined, null);
          expect(expectedResult).toEqual(medioDePagoTarjetaCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
