import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMovimientoArticulo, MovimientoArticulo } from '../movimiento-articulo.model';

import { MovimientoArticuloService } from './movimiento-articulo.service';

describe('Service Tests', () => {
  describe('MovimientoArticulo Service', () => {
    let service: MovimientoArticuloService;
    let httpMock: HttpTestingController;
    let elemDefault: IMovimientoArticulo;
    let expectedResult: IMovimientoArticulo | IMovimientoArticulo[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MovimientoArticuloService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cantidad: 0,
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

      it('should create a MovimientoArticulo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MovimientoArticulo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MovimientoArticulo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidad: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a MovimientoArticulo', () => {
        const patchObject = Object.assign(
          {
            cantidad: 1,
          },
          new MovimientoArticulo()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MovimientoArticulo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidad: 1,
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

      it('should delete a MovimientoArticulo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMovimientoArticuloToCollectionIfMissing', () => {
        it('should add a MovimientoArticulo to an empty array', () => {
          const movimientoArticulo: IMovimientoArticulo = { id: 123 };
          expectedResult = service.addMovimientoArticuloToCollectionIfMissing([], movimientoArticulo);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(movimientoArticulo);
        });

        it('should not add a MovimientoArticulo to an array that contains it', () => {
          const movimientoArticulo: IMovimientoArticulo = { id: 123 };
          const movimientoArticuloCollection: IMovimientoArticulo[] = [
            {
              ...movimientoArticulo,
            },
            { id: 456 },
          ];
          expectedResult = service.addMovimientoArticuloToCollectionIfMissing(movimientoArticuloCollection, movimientoArticulo);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a MovimientoArticulo to an array that doesn't contain it", () => {
          const movimientoArticulo: IMovimientoArticulo = { id: 123 };
          const movimientoArticuloCollection: IMovimientoArticulo[] = [{ id: 456 }];
          expectedResult = service.addMovimientoArticuloToCollectionIfMissing(movimientoArticuloCollection, movimientoArticulo);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(movimientoArticulo);
        });

        it('should add only unique MovimientoArticulo to an array', () => {
          const movimientoArticuloArray: IMovimientoArticulo[] = [{ id: 123 }, { id: 456 }, { id: 4745 }];
          const movimientoArticuloCollection: IMovimientoArticulo[] = [{ id: 123 }];
          expectedResult = service.addMovimientoArticuloToCollectionIfMissing(movimientoArticuloCollection, ...movimientoArticuloArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const movimientoArticulo: IMovimientoArticulo = { id: 123 };
          const movimientoArticulo2: IMovimientoArticulo = { id: 456 };
          expectedResult = service.addMovimientoArticuloToCollectionIfMissing([], movimientoArticulo, movimientoArticulo2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(movimientoArticulo);
          expect(expectedResult).toContain(movimientoArticulo2);
        });

        it('should accept null and undefined values', () => {
          const movimientoArticulo: IMovimientoArticulo = { id: 123 };
          expectedResult = service.addMovimientoArticuloToCollectionIfMissing([], null, movimientoArticulo, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(movimientoArticulo);
        });

        it('should return initial array if no MovimientoArticulo is added', () => {
          const movimientoArticuloCollection: IMovimientoArticulo[] = [{ id: 123 }];
          expectedResult = service.addMovimientoArticuloToCollectionIfMissing(movimientoArticuloCollection, undefined, null);
          expect(expectedResult).toEqual(movimientoArticuloCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
