import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDetallMovimiento, DetallMovimiento } from '../detall-movimiento.model';

import { DetallMovimientoService } from './detall-movimiento.service';

describe('Service Tests', () => {
  describe('DetallMovimiento Service', () => {
    let service: DetallMovimientoService;
    let httpMock: HttpTestingController;
    let elemDefault: IDetallMovimiento;
    let expectedResult: IDetallMovimiento | IDetallMovimiento[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DetallMovimientoService);
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

      it('should create a DetallMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DetallMovimiento()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DetallMovimiento', () => {
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

      it('should partial update a DetallMovimiento', () => {
        const patchObject = Object.assign({}, new DetallMovimiento());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DetallMovimiento', () => {
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

      it('should delete a DetallMovimiento', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDetallMovimientoToCollectionIfMissing', () => {
        it('should add a DetallMovimiento to an empty array', () => {
          const detallMovimiento: IDetallMovimiento = { id: 123 };
          expectedResult = service.addDetallMovimientoToCollectionIfMissing([], detallMovimiento);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(detallMovimiento);
        });

        it('should not add a DetallMovimiento to an array that contains it', () => {
          const detallMovimiento: IDetallMovimiento = { id: 123 };
          const detallMovimientoCollection: IDetallMovimiento[] = [
            {
              ...detallMovimiento,
            },
            { id: 456 },
          ];
          expectedResult = service.addDetallMovimientoToCollectionIfMissing(detallMovimientoCollection, detallMovimiento);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a DetallMovimiento to an array that doesn't contain it", () => {
          const detallMovimiento: IDetallMovimiento = { id: 123 };
          const detallMovimientoCollection: IDetallMovimiento[] = [{ id: 456 }];
          expectedResult = service.addDetallMovimientoToCollectionIfMissing(detallMovimientoCollection, detallMovimiento);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(detallMovimiento);
        });

        it('should add only unique DetallMovimiento to an array', () => {
          const detallMovimientoArray: IDetallMovimiento[] = [{ id: 123 }, { id: 456 }, { id: 37017 }];
          const detallMovimientoCollection: IDetallMovimiento[] = [{ id: 123 }];
          expectedResult = service.addDetallMovimientoToCollectionIfMissing(detallMovimientoCollection, ...detallMovimientoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const detallMovimiento: IDetallMovimiento = { id: 123 };
          const detallMovimiento2: IDetallMovimiento = { id: 456 };
          expectedResult = service.addDetallMovimientoToCollectionIfMissing([], detallMovimiento, detallMovimiento2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(detallMovimiento);
          expect(expectedResult).toContain(detallMovimiento2);
        });

        it('should accept null and undefined values', () => {
          const detallMovimiento: IDetallMovimiento = { id: 123 };
          expectedResult = service.addDetallMovimientoToCollectionIfMissing([], null, detallMovimiento, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(detallMovimiento);
        });

        it('should return initial array if no DetallMovimiento is added', () => {
          const detallMovimientoCollection: IDetallMovimiento[] = [{ id: 123 }];
          expectedResult = service.addDetallMovimientoToCollectionIfMissing(detallMovimientoCollection, undefined, null);
          expect(expectedResult).toEqual(detallMovimientoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
