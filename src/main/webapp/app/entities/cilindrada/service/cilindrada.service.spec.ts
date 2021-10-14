import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICilindrada, Cilindrada } from '../cilindrada.model';

import { CilindradaService } from './cilindrada.service';

describe('Service Tests', () => {
  describe('Cilindrada Service', () => {
    let service: CilindradaService;
    let httpMock: HttpTestingController;
    let elemDefault: ICilindrada;
    let expectedResult: ICilindrada | ICilindrada[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CilindradaService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cantidadDeCilindros: 0,
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

      it('should create a Cilindrada', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Cilindrada()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Cilindrada', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadDeCilindros: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Cilindrada', () => {
        const patchObject = Object.assign(
          {
            cantidadDeCilindros: 1,
          },
          new Cilindrada()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Cilindrada', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadDeCilindros: 1,
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

      it('should delete a Cilindrada', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCilindradaToCollectionIfMissing', () => {
        it('should add a Cilindrada to an empty array', () => {
          const cilindrada: ICilindrada = { id: 123 };
          expectedResult = service.addCilindradaToCollectionIfMissing([], cilindrada);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cilindrada);
        });

        it('should not add a Cilindrada to an array that contains it', () => {
          const cilindrada: ICilindrada = { id: 123 };
          const cilindradaCollection: ICilindrada[] = [
            {
              ...cilindrada,
            },
            { id: 456 },
          ];
          expectedResult = service.addCilindradaToCollectionIfMissing(cilindradaCollection, cilindrada);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Cilindrada to an array that doesn't contain it", () => {
          const cilindrada: ICilindrada = { id: 123 };
          const cilindradaCollection: ICilindrada[] = [{ id: 456 }];
          expectedResult = service.addCilindradaToCollectionIfMissing(cilindradaCollection, cilindrada);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cilindrada);
        });

        it('should add only unique Cilindrada to an array', () => {
          const cilindradaArray: ICilindrada[] = [{ id: 123 }, { id: 456 }, { id: 17844 }];
          const cilindradaCollection: ICilindrada[] = [{ id: 123 }];
          expectedResult = service.addCilindradaToCollectionIfMissing(cilindradaCollection, ...cilindradaArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cilindrada: ICilindrada = { id: 123 };
          const cilindrada2: ICilindrada = { id: 456 };
          expectedResult = service.addCilindradaToCollectionIfMissing([], cilindrada, cilindrada2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cilindrada);
          expect(expectedResult).toContain(cilindrada2);
        });

        it('should accept null and undefined values', () => {
          const cilindrada: ICilindrada = { id: 123 };
          expectedResult = service.addCilindradaToCollectionIfMissing([], null, cilindrada, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cilindrada);
        });

        it('should return initial array if no Cilindrada is added', () => {
          const cilindradaCollection: ICilindrada[] = [{ id: 123 }];
          expectedResult = service.addCilindradaToCollectionIfMissing(cilindradaCollection, undefined, null);
          expect(expectedResult).toEqual(cilindradaCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
