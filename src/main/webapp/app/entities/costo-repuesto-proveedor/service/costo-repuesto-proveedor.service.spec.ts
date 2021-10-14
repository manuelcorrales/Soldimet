import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICostoRepuestoProveedor, CostoRepuestoProveedor } from '../costo-repuesto-proveedor.model';

import { CostoRepuestoProveedorService } from './costo-repuesto-proveedor.service';

describe('Service Tests', () => {
  describe('CostoRepuestoProveedor Service', () => {
    let service: CostoRepuestoProveedorService;
    let httpMock: HttpTestingController;
    let elemDefault: ICostoRepuestoProveedor;
    let expectedResult: ICostoRepuestoProveedor | ICostoRepuestoProveedor[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CostoRepuestoProveedorService);
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

      it('should create a CostoRepuestoProveedor', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CostoRepuestoProveedor()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CostoRepuestoProveedor', () => {
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

      it('should partial update a CostoRepuestoProveedor', () => {
        const patchObject = Object.assign({}, new CostoRepuestoProveedor());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CostoRepuestoProveedor', () => {
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

      it('should delete a CostoRepuestoProveedor', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCostoRepuestoProveedorToCollectionIfMissing', () => {
        it('should add a CostoRepuestoProveedor to an empty array', () => {
          const costoRepuestoProveedor: ICostoRepuestoProveedor = { id: 123 };
          expectedResult = service.addCostoRepuestoProveedorToCollectionIfMissing([], costoRepuestoProveedor);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(costoRepuestoProveedor);
        });

        it('should not add a CostoRepuestoProveedor to an array that contains it', () => {
          const costoRepuestoProveedor: ICostoRepuestoProveedor = { id: 123 };
          const costoRepuestoProveedorCollection: ICostoRepuestoProveedor[] = [
            {
              ...costoRepuestoProveedor,
            },
            { id: 456 },
          ];
          expectedResult = service.addCostoRepuestoProveedorToCollectionIfMissing(costoRepuestoProveedorCollection, costoRepuestoProveedor);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CostoRepuestoProveedor to an array that doesn't contain it", () => {
          const costoRepuestoProveedor: ICostoRepuestoProveedor = { id: 123 };
          const costoRepuestoProveedorCollection: ICostoRepuestoProveedor[] = [{ id: 456 }];
          expectedResult = service.addCostoRepuestoProveedorToCollectionIfMissing(costoRepuestoProveedorCollection, costoRepuestoProveedor);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(costoRepuestoProveedor);
        });

        it('should add only unique CostoRepuestoProveedor to an array', () => {
          const costoRepuestoProveedorArray: ICostoRepuestoProveedor[] = [{ id: 123 }, { id: 456 }, { id: 44235 }];
          const costoRepuestoProveedorCollection: ICostoRepuestoProveedor[] = [{ id: 123 }];
          expectedResult = service.addCostoRepuestoProveedorToCollectionIfMissing(
            costoRepuestoProveedorCollection,
            ...costoRepuestoProveedorArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const costoRepuestoProveedor: ICostoRepuestoProveedor = { id: 123 };
          const costoRepuestoProveedor2: ICostoRepuestoProveedor = { id: 456 };
          expectedResult = service.addCostoRepuestoProveedorToCollectionIfMissing([], costoRepuestoProveedor, costoRepuestoProveedor2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(costoRepuestoProveedor);
          expect(expectedResult).toContain(costoRepuestoProveedor2);
        });

        it('should accept null and undefined values', () => {
          const costoRepuestoProveedor: ICostoRepuestoProveedor = { id: 123 };
          expectedResult = service.addCostoRepuestoProveedorToCollectionIfMissing([], null, costoRepuestoProveedor, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(costoRepuestoProveedor);
        });

        it('should return initial array if no CostoRepuestoProveedor is added', () => {
          const costoRepuestoProveedorCollection: ICostoRepuestoProveedor[] = [{ id: 123 }];
          expectedResult = service.addCostoRepuestoProveedorToCollectionIfMissing(costoRepuestoProveedorCollection, undefined, null);
          expect(expectedResult).toEqual(costoRepuestoProveedorCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
