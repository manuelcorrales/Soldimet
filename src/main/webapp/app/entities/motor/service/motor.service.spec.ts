import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMotor, Motor } from '../motor.model';

import { MotorService } from './motor.service';

describe('Service Tests', () => {
  describe('Motor Service', () => {
    let service: MotorService;
    let httpMock: HttpTestingController;
    let elemDefault: IMotor;
    let expectedResult: IMotor | IMotor[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MotorService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        marcaMotor: 'AAAAAAA',
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

      it('should create a Motor', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Motor()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Motor', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            marcaMotor: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Motor', () => {
        const patchObject = Object.assign({}, new Motor());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Motor', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            marcaMotor: 'BBBBBB',
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

      it('should delete a Motor', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMotorToCollectionIfMissing', () => {
        it('should add a Motor to an empty array', () => {
          const motor: IMotor = { id: 123 };
          expectedResult = service.addMotorToCollectionIfMissing([], motor);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(motor);
        });

        it('should not add a Motor to an array that contains it', () => {
          const motor: IMotor = { id: 123 };
          const motorCollection: IMotor[] = [
            {
              ...motor,
            },
            { id: 456 },
          ];
          expectedResult = service.addMotorToCollectionIfMissing(motorCollection, motor);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Motor to an array that doesn't contain it", () => {
          const motor: IMotor = { id: 123 };
          const motorCollection: IMotor[] = [{ id: 456 }];
          expectedResult = service.addMotorToCollectionIfMissing(motorCollection, motor);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(motor);
        });

        it('should add only unique Motor to an array', () => {
          const motorArray: IMotor[] = [{ id: 123 }, { id: 456 }, { id: 77970 }];
          const motorCollection: IMotor[] = [{ id: 123 }];
          expectedResult = service.addMotorToCollectionIfMissing(motorCollection, ...motorArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const motor: IMotor = { id: 123 };
          const motor2: IMotor = { id: 456 };
          expectedResult = service.addMotorToCollectionIfMissing([], motor, motor2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(motor);
          expect(expectedResult).toContain(motor2);
        });

        it('should accept null and undefined values', () => {
          const motor: IMotor = { id: 123 };
          expectedResult = service.addMotorToCollectionIfMissing([], null, motor, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(motor);
        });

        it('should return initial array if no Motor is added', () => {
          const motorCollection: IMotor[] = [{ id: 123 }];
          expectedResult = service.addMotorToCollectionIfMissing(motorCollection, undefined, null);
          expect(expectedResult).toEqual(motorCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
