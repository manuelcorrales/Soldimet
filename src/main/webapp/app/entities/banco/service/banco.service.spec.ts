import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBanco, Banco } from '../banco.model';

import { BancoService } from './banco.service';

describe('Service Tests', () => {
  describe('Banco Service', () => {
    let service: BancoService;
    let httpMock: HttpTestingController;
    let elemDefault: IBanco;
    let expectedResult: IBanco | IBanco[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(BancoService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombreBanco: 'AAAAAAA',
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

      it('should create a Banco', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Banco()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Banco', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreBanco: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Banco', () => {
        const patchObject = Object.assign(
          {
            nombreBanco: 'BBBBBB',
          },
          new Banco()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Banco', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreBanco: 'BBBBBB',
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

      it('should delete a Banco', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addBancoToCollectionIfMissing', () => {
        it('should add a Banco to an empty array', () => {
          const banco: IBanco = { id: 123 };
          expectedResult = service.addBancoToCollectionIfMissing([], banco);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(banco);
        });

        it('should not add a Banco to an array that contains it', () => {
          const banco: IBanco = { id: 123 };
          const bancoCollection: IBanco[] = [
            {
              ...banco,
            },
            { id: 456 },
          ];
          expectedResult = service.addBancoToCollectionIfMissing(bancoCollection, banco);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Banco to an array that doesn't contain it", () => {
          const banco: IBanco = { id: 123 };
          const bancoCollection: IBanco[] = [{ id: 456 }];
          expectedResult = service.addBancoToCollectionIfMissing(bancoCollection, banco);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(banco);
        });

        it('should add only unique Banco to an array', () => {
          const bancoArray: IBanco[] = [{ id: 123 }, { id: 456 }, { id: 3534 }];
          const bancoCollection: IBanco[] = [{ id: 123 }];
          expectedResult = service.addBancoToCollectionIfMissing(bancoCollection, ...bancoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const banco: IBanco = { id: 123 };
          const banco2: IBanco = { id: 456 };
          expectedResult = service.addBancoToCollectionIfMissing([], banco, banco2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(banco);
          expect(expectedResult).toContain(banco2);
        });

        it('should accept null and undefined values', () => {
          const banco: IBanco = { id: 123 };
          expectedResult = service.addBancoToCollectionIfMissing([], null, banco, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(banco);
        });

        it('should return initial array if no Banco is added', () => {
          const bancoCollection: IBanco[] = [{ id: 123 }];
          expectedResult = service.addBancoToCollectionIfMissing(bancoCollection, undefined, null);
          expect(expectedResult).toEqual(bancoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
