import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRubro, Rubro } from '../rubro.model';

import { RubroService } from './rubro.service';

describe('Service Tests', () => {
  describe('Rubro Service', () => {
    let service: RubroService;
    let httpMock: HttpTestingController;
    let elemDefault: IRubro;
    let expectedResult: IRubro | IRubro[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(RubroService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombreRubro: 'AAAAAAA',
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

      it('should create a Rubro', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Rubro()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Rubro', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreRubro: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Rubro', () => {
        const patchObject = Object.assign(
          {
            nombreRubro: 'BBBBBB',
          },
          new Rubro()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Rubro', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreRubro: 'BBBBBB',
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

      it('should delete a Rubro', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addRubroToCollectionIfMissing', () => {
        it('should add a Rubro to an empty array', () => {
          const rubro: IRubro = { id: 123 };
          expectedResult = service.addRubroToCollectionIfMissing([], rubro);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(rubro);
        });

        it('should not add a Rubro to an array that contains it', () => {
          const rubro: IRubro = { id: 123 };
          const rubroCollection: IRubro[] = [
            {
              ...rubro,
            },
            { id: 456 },
          ];
          expectedResult = service.addRubroToCollectionIfMissing(rubroCollection, rubro);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Rubro to an array that doesn't contain it", () => {
          const rubro: IRubro = { id: 123 };
          const rubroCollection: IRubro[] = [{ id: 456 }];
          expectedResult = service.addRubroToCollectionIfMissing(rubroCollection, rubro);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(rubro);
        });

        it('should add only unique Rubro to an array', () => {
          const rubroArray: IRubro[] = [{ id: 123 }, { id: 456 }, { id: 32909 }];
          const rubroCollection: IRubro[] = [{ id: 123 }];
          expectedResult = service.addRubroToCollectionIfMissing(rubroCollection, ...rubroArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const rubro: IRubro = { id: 123 };
          const rubro2: IRubro = { id: 456 };
          expectedResult = service.addRubroToCollectionIfMissing([], rubro, rubro2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(rubro);
          expect(expectedResult).toContain(rubro2);
        });

        it('should accept null and undefined values', () => {
          const rubro: IRubro = { id: 123 };
          expectedResult = service.addRubroToCollectionIfMissing([], null, rubro, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(rubro);
        });

        it('should return initial array if no Rubro is added', () => {
          const rubroCollection: IRubro[] = [{ id: 123 }];
          expectedResult = service.addRubroToCollectionIfMissing(rubroCollection, undefined, null);
          expect(expectedResult).toEqual(rubroCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
