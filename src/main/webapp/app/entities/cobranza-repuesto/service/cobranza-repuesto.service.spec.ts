import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICobranzaRepuesto, CobranzaRepuesto } from '../cobranza-repuesto.model';

import { CobranzaRepuestoService } from './cobranza-repuesto.service';

describe('Service Tests', () => {
  describe('CobranzaRepuesto Service', () => {
    let service: CobranzaRepuestoService;
    let httpMock: HttpTestingController;
    let elemDefault: ICobranzaRepuesto;
    let expectedResult: ICobranzaRepuesto | ICobranzaRepuesto[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CobranzaRepuestoService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        valor: 0,
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

      it('should create a CobranzaRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CobranzaRepuesto()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CobranzaRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            valor: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CobranzaRepuesto', () => {
        const patchObject = Object.assign(
          {
            valor: 1,
          },
          new CobranzaRepuesto()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CobranzaRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            valor: 1,
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

      it('should delete a CobranzaRepuesto', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCobranzaRepuestoToCollectionIfMissing', () => {
        it('should add a CobranzaRepuesto to an empty array', () => {
          const cobranzaRepuesto: ICobranzaRepuesto = { id: 123 };
          expectedResult = service.addCobranzaRepuestoToCollectionIfMissing([], cobranzaRepuesto);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cobranzaRepuesto);
        });

        it('should not add a CobranzaRepuesto to an array that contains it', () => {
          const cobranzaRepuesto: ICobranzaRepuesto = { id: 123 };
          const cobranzaRepuestoCollection: ICobranzaRepuesto[] = [
            {
              ...cobranzaRepuesto,
            },
            { id: 456 },
          ];
          expectedResult = service.addCobranzaRepuestoToCollectionIfMissing(cobranzaRepuestoCollection, cobranzaRepuesto);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CobranzaRepuesto to an array that doesn't contain it", () => {
          const cobranzaRepuesto: ICobranzaRepuesto = { id: 123 };
          const cobranzaRepuestoCollection: ICobranzaRepuesto[] = [{ id: 456 }];
          expectedResult = service.addCobranzaRepuestoToCollectionIfMissing(cobranzaRepuestoCollection, cobranzaRepuesto);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cobranzaRepuesto);
        });

        it('should add only unique CobranzaRepuesto to an array', () => {
          const cobranzaRepuestoArray: ICobranzaRepuesto[] = [{ id: 123 }, { id: 456 }, { id: 83549 }];
          const cobranzaRepuestoCollection: ICobranzaRepuesto[] = [{ id: 123 }];
          expectedResult = service.addCobranzaRepuestoToCollectionIfMissing(cobranzaRepuestoCollection, ...cobranzaRepuestoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cobranzaRepuesto: ICobranzaRepuesto = { id: 123 };
          const cobranzaRepuesto2: ICobranzaRepuesto = { id: 456 };
          expectedResult = service.addCobranzaRepuestoToCollectionIfMissing([], cobranzaRepuesto, cobranzaRepuesto2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cobranzaRepuesto);
          expect(expectedResult).toContain(cobranzaRepuesto2);
        });

        it('should accept null and undefined values', () => {
          const cobranzaRepuesto: ICobranzaRepuesto = { id: 123 };
          expectedResult = service.addCobranzaRepuestoToCollectionIfMissing([], null, cobranzaRepuesto, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cobranzaRepuesto);
        });

        it('should return initial array if no CobranzaRepuesto is added', () => {
          const cobranzaRepuestoCollection: ICobranzaRepuesto[] = [{ id: 123 }];
          expectedResult = service.addCobranzaRepuestoToCollectionIfMissing(cobranzaRepuestoCollection, undefined, null);
          expect(expectedResult).toEqual(cobranzaRepuestoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
