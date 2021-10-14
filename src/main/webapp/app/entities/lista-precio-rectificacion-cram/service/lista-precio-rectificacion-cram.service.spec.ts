import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IListaPrecioRectificacionCRAM, ListaPrecioRectificacionCRAM } from '../lista-precio-rectificacion-cram.model';

import { ListaPrecioRectificacionCRAMService } from './lista-precio-rectificacion-cram.service';

describe('Service Tests', () => {
  describe('ListaPrecioRectificacionCRAM Service', () => {
    let service: ListaPrecioRectificacionCRAMService;
    let httpMock: HttpTestingController;
    let elemDefault: IListaPrecioRectificacionCRAM;
    let expectedResult: IListaPrecioRectificacionCRAM | IListaPrecioRectificacionCRAM[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ListaPrecioRectificacionCRAMService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        numeroGrupo: 0,
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

      it('should create a ListaPrecioRectificacionCRAM', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ListaPrecioRectificacionCRAM()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ListaPrecioRectificacionCRAM', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            numeroGrupo: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a ListaPrecioRectificacionCRAM', () => {
        const patchObject = Object.assign({}, new ListaPrecioRectificacionCRAM());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ListaPrecioRectificacionCRAM', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            numeroGrupo: 1,
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

      it('should delete a ListaPrecioRectificacionCRAM', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addListaPrecioRectificacionCRAMToCollectionIfMissing', () => {
        it('should add a ListaPrecioRectificacionCRAM to an empty array', () => {
          const listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM = { id: 123 };
          expectedResult = service.addListaPrecioRectificacionCRAMToCollectionIfMissing([], listaPrecioRectificacionCRAM);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(listaPrecioRectificacionCRAM);
        });

        it('should not add a ListaPrecioRectificacionCRAM to an array that contains it', () => {
          const listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM = { id: 123 };
          const listaPrecioRectificacionCRAMCollection: IListaPrecioRectificacionCRAM[] = [
            {
              ...listaPrecioRectificacionCRAM,
            },
            { id: 456 },
          ];
          expectedResult = service.addListaPrecioRectificacionCRAMToCollectionIfMissing(
            listaPrecioRectificacionCRAMCollection,
            listaPrecioRectificacionCRAM
          );
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ListaPrecioRectificacionCRAM to an array that doesn't contain it", () => {
          const listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM = { id: 123 };
          const listaPrecioRectificacionCRAMCollection: IListaPrecioRectificacionCRAM[] = [{ id: 456 }];
          expectedResult = service.addListaPrecioRectificacionCRAMToCollectionIfMissing(
            listaPrecioRectificacionCRAMCollection,
            listaPrecioRectificacionCRAM
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(listaPrecioRectificacionCRAM);
        });

        it('should add only unique ListaPrecioRectificacionCRAM to an array', () => {
          const listaPrecioRectificacionCRAMArray: IListaPrecioRectificacionCRAM[] = [{ id: 123 }, { id: 456 }, { id: 56337 }];
          const listaPrecioRectificacionCRAMCollection: IListaPrecioRectificacionCRAM[] = [{ id: 123 }];
          expectedResult = service.addListaPrecioRectificacionCRAMToCollectionIfMissing(
            listaPrecioRectificacionCRAMCollection,
            ...listaPrecioRectificacionCRAMArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM = { id: 123 };
          const listaPrecioRectificacionCRAM2: IListaPrecioRectificacionCRAM = { id: 456 };
          expectedResult = service.addListaPrecioRectificacionCRAMToCollectionIfMissing(
            [],
            listaPrecioRectificacionCRAM,
            listaPrecioRectificacionCRAM2
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(listaPrecioRectificacionCRAM);
          expect(expectedResult).toContain(listaPrecioRectificacionCRAM2);
        });

        it('should accept null and undefined values', () => {
          const listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM = { id: 123 };
          expectedResult = service.addListaPrecioRectificacionCRAMToCollectionIfMissing([], null, listaPrecioRectificacionCRAM, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(listaPrecioRectificacionCRAM);
        });

        it('should return initial array if no ListaPrecioRectificacionCRAM is added', () => {
          const listaPrecioRectificacionCRAMCollection: IListaPrecioRectificacionCRAM[] = [{ id: 123 }];
          expectedResult = service.addListaPrecioRectificacionCRAMToCollectionIfMissing(
            listaPrecioRectificacionCRAMCollection,
            undefined,
            null
          );
          expect(expectedResult).toEqual(listaPrecioRectificacionCRAMCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
