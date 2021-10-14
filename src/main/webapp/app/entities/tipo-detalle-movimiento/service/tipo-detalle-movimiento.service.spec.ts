import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoDetalleMovimiento, TipoDetalleMovimiento } from '../tipo-detalle-movimiento.model';

import { TipoDetalleMovimientoService } from './tipo-detalle-movimiento.service';

describe('Service Tests', () => {
  describe('TipoDetalleMovimiento Service', () => {
    let service: TipoDetalleMovimientoService;
    let httpMock: HttpTestingController;
    let elemDefault: ITipoDetalleMovimiento;
    let expectedResult: ITipoDetalleMovimiento | ITipoDetalleMovimiento[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TipoDetalleMovimientoService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombreTipoDetalle: 'AAAAAAA',
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

      it('should create a TipoDetalleMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TipoDetalleMovimiento()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TipoDetalleMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreTipoDetalle: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TipoDetalleMovimiento', () => {
        const patchObject = Object.assign(
          {
            nombreTipoDetalle: 'BBBBBB',
          },
          new TipoDetalleMovimiento()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TipoDetalleMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreTipoDetalle: 'BBBBBB',
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

      it('should delete a TipoDetalleMovimiento', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTipoDetalleMovimientoToCollectionIfMissing', () => {
        it('should add a TipoDetalleMovimiento to an empty array', () => {
          const tipoDetalleMovimiento: ITipoDetalleMovimiento = { id: 123 };
          expectedResult = service.addTipoDetalleMovimientoToCollectionIfMissing([], tipoDetalleMovimiento);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tipoDetalleMovimiento);
        });

        it('should not add a TipoDetalleMovimiento to an array that contains it', () => {
          const tipoDetalleMovimiento: ITipoDetalleMovimiento = { id: 123 };
          const tipoDetalleMovimientoCollection: ITipoDetalleMovimiento[] = [
            {
              ...tipoDetalleMovimiento,
            },
            { id: 456 },
          ];
          expectedResult = service.addTipoDetalleMovimientoToCollectionIfMissing(tipoDetalleMovimientoCollection, tipoDetalleMovimiento);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TipoDetalleMovimiento to an array that doesn't contain it", () => {
          const tipoDetalleMovimiento: ITipoDetalleMovimiento = { id: 123 };
          const tipoDetalleMovimientoCollection: ITipoDetalleMovimiento[] = [{ id: 456 }];
          expectedResult = service.addTipoDetalleMovimientoToCollectionIfMissing(tipoDetalleMovimientoCollection, tipoDetalleMovimiento);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tipoDetalleMovimiento);
        });

        it('should add only unique TipoDetalleMovimiento to an array', () => {
          const tipoDetalleMovimientoArray: ITipoDetalleMovimiento[] = [{ id: 123 }, { id: 456 }, { id: 41777 }];
          const tipoDetalleMovimientoCollection: ITipoDetalleMovimiento[] = [{ id: 123 }];
          expectedResult = service.addTipoDetalleMovimientoToCollectionIfMissing(
            tipoDetalleMovimientoCollection,
            ...tipoDetalleMovimientoArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const tipoDetalleMovimiento: ITipoDetalleMovimiento = { id: 123 };
          const tipoDetalleMovimiento2: ITipoDetalleMovimiento = { id: 456 };
          expectedResult = service.addTipoDetalleMovimientoToCollectionIfMissing([], tipoDetalleMovimiento, tipoDetalleMovimiento2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tipoDetalleMovimiento);
          expect(expectedResult).toContain(tipoDetalleMovimiento2);
        });

        it('should accept null and undefined values', () => {
          const tipoDetalleMovimiento: ITipoDetalleMovimiento = { id: 123 };
          expectedResult = service.addTipoDetalleMovimientoToCollectionIfMissing([], null, tipoDetalleMovimiento, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tipoDetalleMovimiento);
        });

        it('should return initial array if no TipoDetalleMovimiento is added', () => {
          const tipoDetalleMovimientoCollection: ITipoDetalleMovimiento[] = [{ id: 123 }];
          expectedResult = service.addTipoDetalleMovimientoToCollectionIfMissing(tipoDetalleMovimientoCollection, undefined, null);
          expect(expectedResult).toEqual(tipoDetalleMovimientoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
