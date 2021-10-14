import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoMovimiento, TipoMovimiento } from '../tipo-movimiento.model';

import { TipoMovimientoService } from './tipo-movimiento.service';

describe('Service Tests', () => {
  describe('TipoMovimiento Service', () => {
    let service: TipoMovimientoService;
    let httpMock: HttpTestingController;
    let elemDefault: ITipoMovimiento;
    let expectedResult: ITipoMovimiento | ITipoMovimiento[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TipoMovimientoService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombreTipoMovimiento: 'AAAAAAA',
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

      it('should create a TipoMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TipoMovimiento()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TipoMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreTipoMovimiento: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TipoMovimiento', () => {
        const patchObject = Object.assign({}, new TipoMovimiento());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TipoMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreTipoMovimiento: 'BBBBBB',
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

      it('should delete a TipoMovimiento', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTipoMovimientoToCollectionIfMissing', () => {
        it('should add a TipoMovimiento to an empty array', () => {
          const tipoMovimiento: ITipoMovimiento = { id: 123 };
          expectedResult = service.addTipoMovimientoToCollectionIfMissing([], tipoMovimiento);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tipoMovimiento);
        });

        it('should not add a TipoMovimiento to an array that contains it', () => {
          const tipoMovimiento: ITipoMovimiento = { id: 123 };
          const tipoMovimientoCollection: ITipoMovimiento[] = [
            {
              ...tipoMovimiento,
            },
            { id: 456 },
          ];
          expectedResult = service.addTipoMovimientoToCollectionIfMissing(tipoMovimientoCollection, tipoMovimiento);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TipoMovimiento to an array that doesn't contain it", () => {
          const tipoMovimiento: ITipoMovimiento = { id: 123 };
          const tipoMovimientoCollection: ITipoMovimiento[] = [{ id: 456 }];
          expectedResult = service.addTipoMovimientoToCollectionIfMissing(tipoMovimientoCollection, tipoMovimiento);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tipoMovimiento);
        });

        it('should add only unique TipoMovimiento to an array', () => {
          const tipoMovimientoArray: ITipoMovimiento[] = [{ id: 123 }, { id: 456 }, { id: 77577 }];
          const tipoMovimientoCollection: ITipoMovimiento[] = [{ id: 123 }];
          expectedResult = service.addTipoMovimientoToCollectionIfMissing(tipoMovimientoCollection, ...tipoMovimientoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const tipoMovimiento: ITipoMovimiento = { id: 123 };
          const tipoMovimiento2: ITipoMovimiento = { id: 456 };
          expectedResult = service.addTipoMovimientoToCollectionIfMissing([], tipoMovimiento, tipoMovimiento2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tipoMovimiento);
          expect(expectedResult).toContain(tipoMovimiento2);
        });

        it('should accept null and undefined values', () => {
          const tipoMovimiento: ITipoMovimiento = { id: 123 };
          expectedResult = service.addTipoMovimientoToCollectionIfMissing([], null, tipoMovimiento, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tipoMovimiento);
        });

        it('should return initial array if no TipoMovimiento is added', () => {
          const tipoMovimientoCollection: ITipoMovimiento[] = [{ id: 123 }];
          expectedResult = service.addTipoMovimientoToCollectionIfMissing(tipoMovimientoCollection, undefined, null);
          expect(expectedResult).toEqual(tipoMovimientoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
