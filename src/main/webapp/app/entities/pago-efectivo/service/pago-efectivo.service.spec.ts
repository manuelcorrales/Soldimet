import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPagoEfectivo, PagoEfectivo } from '../pago-efectivo.model';

import { PagoEfectivoService } from './pago-efectivo.service';

describe('Service Tests', () => {
  describe('PagoEfectivo Service', () => {
    let service: PagoEfectivoService;
    let httpMock: HttpTestingController;
    let elemDefault: IPagoEfectivo;
    let expectedResult: IPagoEfectivo | IPagoEfectivo[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PagoEfectivoService);
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

      it('should create a PagoEfectivo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new PagoEfectivo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PagoEfectivo', () => {
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

      it('should partial update a PagoEfectivo', () => {
        const patchObject = Object.assign({}, new PagoEfectivo());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PagoEfectivo', () => {
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

      it('should delete a PagoEfectivo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPagoEfectivoToCollectionIfMissing', () => {
        it('should add a PagoEfectivo to an empty array', () => {
          const pagoEfectivo: IPagoEfectivo = { id: 123 };
          expectedResult = service.addPagoEfectivoToCollectionIfMissing([], pagoEfectivo);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(pagoEfectivo);
        });

        it('should not add a PagoEfectivo to an array that contains it', () => {
          const pagoEfectivo: IPagoEfectivo = { id: 123 };
          const pagoEfectivoCollection: IPagoEfectivo[] = [
            {
              ...pagoEfectivo,
            },
            { id: 456 },
          ];
          expectedResult = service.addPagoEfectivoToCollectionIfMissing(pagoEfectivoCollection, pagoEfectivo);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a PagoEfectivo to an array that doesn't contain it", () => {
          const pagoEfectivo: IPagoEfectivo = { id: 123 };
          const pagoEfectivoCollection: IPagoEfectivo[] = [{ id: 456 }];
          expectedResult = service.addPagoEfectivoToCollectionIfMissing(pagoEfectivoCollection, pagoEfectivo);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(pagoEfectivo);
        });

        it('should add only unique PagoEfectivo to an array', () => {
          const pagoEfectivoArray: IPagoEfectivo[] = [{ id: 123 }, { id: 456 }, { id: 345 }];
          const pagoEfectivoCollection: IPagoEfectivo[] = [{ id: 123 }];
          expectedResult = service.addPagoEfectivoToCollectionIfMissing(pagoEfectivoCollection, ...pagoEfectivoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const pagoEfectivo: IPagoEfectivo = { id: 123 };
          const pagoEfectivo2: IPagoEfectivo = { id: 456 };
          expectedResult = service.addPagoEfectivoToCollectionIfMissing([], pagoEfectivo, pagoEfectivo2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(pagoEfectivo);
          expect(expectedResult).toContain(pagoEfectivo2);
        });

        it('should accept null and undefined values', () => {
          const pagoEfectivo: IPagoEfectivo = { id: 123 };
          expectedResult = service.addPagoEfectivoToCollectionIfMissing([], null, pagoEfectivo, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(pagoEfectivo);
        });

        it('should return initial array if no PagoEfectivo is added', () => {
          const pagoEfectivoCollection: IPagoEfectivo[] = [{ id: 123 }];
          expectedResult = service.addPagoEfectivoToCollectionIfMissing(pagoEfectivoCollection, undefined, null);
          expect(expectedResult).toEqual(pagoEfectivoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
