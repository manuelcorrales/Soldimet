import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICostoRepuesto, CostoRepuesto } from '../costo-repuesto.model';

import { CostoRepuestoService } from './costo-repuesto.service';

describe('Service Tests', () => {
  describe('CostoRepuesto Service', () => {
    let service: CostoRepuestoService;
    let httpMock: HttpTestingController;
    let elemDefault: ICostoRepuesto;
    let expectedResult: ICostoRepuesto | ICostoRepuesto[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CostoRepuestoService);
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

      it('should create a CostoRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CostoRepuesto()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CostoRepuesto', () => {
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

      it('should partial update a CostoRepuesto', () => {
        const patchObject = Object.assign({}, new CostoRepuesto());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CostoRepuesto', () => {
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

      it('should delete a CostoRepuesto', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCostoRepuestoToCollectionIfMissing', () => {
        it('should add a CostoRepuesto to an empty array', () => {
          const costoRepuesto: ICostoRepuesto = { id: 123 };
          expectedResult = service.addCostoRepuestoToCollectionIfMissing([], costoRepuesto);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(costoRepuesto);
        });

        it('should not add a CostoRepuesto to an array that contains it', () => {
          const costoRepuesto: ICostoRepuesto = { id: 123 };
          const costoRepuestoCollection: ICostoRepuesto[] = [
            {
              ...costoRepuesto,
            },
            { id: 456 },
          ];
          expectedResult = service.addCostoRepuestoToCollectionIfMissing(costoRepuestoCollection, costoRepuesto);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CostoRepuesto to an array that doesn't contain it", () => {
          const costoRepuesto: ICostoRepuesto = { id: 123 };
          const costoRepuestoCollection: ICostoRepuesto[] = [{ id: 456 }];
          expectedResult = service.addCostoRepuestoToCollectionIfMissing(costoRepuestoCollection, costoRepuesto);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(costoRepuesto);
        });

        it('should add only unique CostoRepuesto to an array', () => {
          const costoRepuestoArray: ICostoRepuesto[] = [{ id: 123 }, { id: 456 }, { id: 52951 }];
          const costoRepuestoCollection: ICostoRepuesto[] = [{ id: 123 }];
          expectedResult = service.addCostoRepuestoToCollectionIfMissing(costoRepuestoCollection, ...costoRepuestoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const costoRepuesto: ICostoRepuesto = { id: 123 };
          const costoRepuesto2: ICostoRepuesto = { id: 456 };
          expectedResult = service.addCostoRepuestoToCollectionIfMissing([], costoRepuesto, costoRepuesto2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(costoRepuesto);
          expect(expectedResult).toContain(costoRepuesto2);
        });

        it('should accept null and undefined values', () => {
          const costoRepuesto: ICostoRepuesto = { id: 123 };
          expectedResult = service.addCostoRepuestoToCollectionIfMissing([], null, costoRepuesto, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(costoRepuesto);
        });

        it('should return initial array if no CostoRepuesto is added', () => {
          const costoRepuestoCollection: ICostoRepuesto[] = [{ id: 123 }];
          expectedResult = service.addCostoRepuestoToCollectionIfMissing(costoRepuestoCollection, undefined, null);
          expect(expectedResult).toEqual(costoRepuestoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
