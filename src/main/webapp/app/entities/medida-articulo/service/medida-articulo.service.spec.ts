import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMedidaArticulo, MedidaArticulo } from '../medida-articulo.model';

import { MedidaArticuloService } from './medida-articulo.service';

describe('Service Tests', () => {
  describe('MedidaArticulo Service', () => {
    let service: MedidaArticuloService;
    let httpMock: HttpTestingController;
    let elemDefault: IMedidaArticulo;
    let expectedResult: IMedidaArticulo | IMedidaArticulo[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MedidaArticuloService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        medida: 'AAAAAAA',
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

      it('should create a MedidaArticulo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MedidaArticulo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MedidaArticulo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            medida: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a MedidaArticulo', () => {
        const patchObject = Object.assign(
          {
            medida: 'BBBBBB',
          },
          new MedidaArticulo()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MedidaArticulo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            medida: 'BBBBBB',
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

      it('should delete a MedidaArticulo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMedidaArticuloToCollectionIfMissing', () => {
        it('should add a MedidaArticulo to an empty array', () => {
          const medidaArticulo: IMedidaArticulo = { id: 123 };
          expectedResult = service.addMedidaArticuloToCollectionIfMissing([], medidaArticulo);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(medidaArticulo);
        });

        it('should not add a MedidaArticulo to an array that contains it', () => {
          const medidaArticulo: IMedidaArticulo = { id: 123 };
          const medidaArticuloCollection: IMedidaArticulo[] = [
            {
              ...medidaArticulo,
            },
            { id: 456 },
          ];
          expectedResult = service.addMedidaArticuloToCollectionIfMissing(medidaArticuloCollection, medidaArticulo);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a MedidaArticulo to an array that doesn't contain it", () => {
          const medidaArticulo: IMedidaArticulo = { id: 123 };
          const medidaArticuloCollection: IMedidaArticulo[] = [{ id: 456 }];
          expectedResult = service.addMedidaArticuloToCollectionIfMissing(medidaArticuloCollection, medidaArticulo);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(medidaArticulo);
        });

        it('should add only unique MedidaArticulo to an array', () => {
          const medidaArticuloArray: IMedidaArticulo[] = [{ id: 123 }, { id: 456 }, { id: 3862 }];
          const medidaArticuloCollection: IMedidaArticulo[] = [{ id: 123 }];
          expectedResult = service.addMedidaArticuloToCollectionIfMissing(medidaArticuloCollection, ...medidaArticuloArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const medidaArticulo: IMedidaArticulo = { id: 123 };
          const medidaArticulo2: IMedidaArticulo = { id: 456 };
          expectedResult = service.addMedidaArticuloToCollectionIfMissing([], medidaArticulo, medidaArticulo2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(medidaArticulo);
          expect(expectedResult).toContain(medidaArticulo2);
        });

        it('should accept null and undefined values', () => {
          const medidaArticulo: IMedidaArticulo = { id: 123 };
          expectedResult = service.addMedidaArticuloToCollectionIfMissing([], null, medidaArticulo, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(medidaArticulo);
        });

        it('should return initial array if no MedidaArticulo is added', () => {
          const medidaArticuloCollection: IMedidaArticulo[] = [{ id: 123 }];
          expectedResult = service.addMedidaArticuloToCollectionIfMissing(medidaArticuloCollection, undefined, null);
          expect(expectedResult).toEqual(medidaArticuloCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
