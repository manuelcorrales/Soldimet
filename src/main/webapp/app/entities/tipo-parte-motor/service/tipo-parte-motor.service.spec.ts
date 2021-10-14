import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoParteMotor, TipoParteMotor } from '../tipo-parte-motor.model';

import { TipoParteMotorService } from './tipo-parte-motor.service';

describe('Service Tests', () => {
  describe('TipoParteMotor Service', () => {
    let service: TipoParteMotorService;
    let httpMock: HttpTestingController;
    let elemDefault: ITipoParteMotor;
    let expectedResult: ITipoParteMotor | ITipoParteMotor[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TipoParteMotorService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombreTipoParteMotor: 'AAAAAAA',
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

      it('should create a TipoParteMotor', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TipoParteMotor()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TipoParteMotor', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreTipoParteMotor: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TipoParteMotor', () => {
        const patchObject = Object.assign(
          {
            nombreTipoParteMotor: 'BBBBBB',
          },
          new TipoParteMotor()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TipoParteMotor', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreTipoParteMotor: 'BBBBBB',
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

      it('should delete a TipoParteMotor', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTipoParteMotorToCollectionIfMissing', () => {
        it('should add a TipoParteMotor to an empty array', () => {
          const tipoParteMotor: ITipoParteMotor = { id: 123 };
          expectedResult = service.addTipoParteMotorToCollectionIfMissing([], tipoParteMotor);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tipoParteMotor);
        });

        it('should not add a TipoParteMotor to an array that contains it', () => {
          const tipoParteMotor: ITipoParteMotor = { id: 123 };
          const tipoParteMotorCollection: ITipoParteMotor[] = [
            {
              ...tipoParteMotor,
            },
            { id: 456 },
          ];
          expectedResult = service.addTipoParteMotorToCollectionIfMissing(tipoParteMotorCollection, tipoParteMotor);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TipoParteMotor to an array that doesn't contain it", () => {
          const tipoParteMotor: ITipoParteMotor = { id: 123 };
          const tipoParteMotorCollection: ITipoParteMotor[] = [{ id: 456 }];
          expectedResult = service.addTipoParteMotorToCollectionIfMissing(tipoParteMotorCollection, tipoParteMotor);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tipoParteMotor);
        });

        it('should add only unique TipoParteMotor to an array', () => {
          const tipoParteMotorArray: ITipoParteMotor[] = [{ id: 123 }, { id: 456 }, { id: 47045 }];
          const tipoParteMotorCollection: ITipoParteMotor[] = [{ id: 123 }];
          expectedResult = service.addTipoParteMotorToCollectionIfMissing(tipoParteMotorCollection, ...tipoParteMotorArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const tipoParteMotor: ITipoParteMotor = { id: 123 };
          const tipoParteMotor2: ITipoParteMotor = { id: 456 };
          expectedResult = service.addTipoParteMotorToCollectionIfMissing([], tipoParteMotor, tipoParteMotor2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tipoParteMotor);
          expect(expectedResult).toContain(tipoParteMotor2);
        });

        it('should accept null and undefined values', () => {
          const tipoParteMotor: ITipoParteMotor = { id: 123 };
          expectedResult = service.addTipoParteMotorToCollectionIfMissing([], null, tipoParteMotor, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tipoParteMotor);
        });

        it('should return initial array if no TipoParteMotor is added', () => {
          const tipoParteMotorCollection: ITipoParteMotor[] = [{ id: 123 }];
          expectedResult = service.addTipoParteMotorToCollectionIfMissing(tipoParteMotorCollection, undefined, null);
          expect(expectedResult).toEqual(tipoParteMotorCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
