import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoRepuesto, TipoRepuesto } from '../tipo-repuesto.model';

import { TipoRepuestoService } from './tipo-repuesto.service';

describe('Service Tests', () => {
  describe('TipoRepuesto Service', () => {
    let service: TipoRepuestoService;
    let httpMock: HttpTestingController;
    let elemDefault: ITipoRepuesto;
    let expectedResult: ITipoRepuesto | ITipoRepuesto[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TipoRepuestoService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombreTipoRepuesto: 'AAAAAAA',
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

      it('should create a TipoRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TipoRepuesto()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TipoRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreTipoRepuesto: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TipoRepuesto', () => {
        const patchObject = Object.assign({}, new TipoRepuesto());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TipoRepuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreTipoRepuesto: 'BBBBBB',
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

      it('should delete a TipoRepuesto', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTipoRepuestoToCollectionIfMissing', () => {
        it('should add a TipoRepuesto to an empty array', () => {
          const tipoRepuesto: ITipoRepuesto = { id: 123 };
          expectedResult = service.addTipoRepuestoToCollectionIfMissing([], tipoRepuesto);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tipoRepuesto);
        });

        it('should not add a TipoRepuesto to an array that contains it', () => {
          const tipoRepuesto: ITipoRepuesto = { id: 123 };
          const tipoRepuestoCollection: ITipoRepuesto[] = [
            {
              ...tipoRepuesto,
            },
            { id: 456 },
          ];
          expectedResult = service.addTipoRepuestoToCollectionIfMissing(tipoRepuestoCollection, tipoRepuesto);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TipoRepuesto to an array that doesn't contain it", () => {
          const tipoRepuesto: ITipoRepuesto = { id: 123 };
          const tipoRepuestoCollection: ITipoRepuesto[] = [{ id: 456 }];
          expectedResult = service.addTipoRepuestoToCollectionIfMissing(tipoRepuestoCollection, tipoRepuesto);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tipoRepuesto);
        });

        it('should add only unique TipoRepuesto to an array', () => {
          const tipoRepuestoArray: ITipoRepuesto[] = [{ id: 123 }, { id: 456 }, { id: 41497 }];
          const tipoRepuestoCollection: ITipoRepuesto[] = [{ id: 123 }];
          expectedResult = service.addTipoRepuestoToCollectionIfMissing(tipoRepuestoCollection, ...tipoRepuestoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const tipoRepuesto: ITipoRepuesto = { id: 123 };
          const tipoRepuesto2: ITipoRepuesto = { id: 456 };
          expectedResult = service.addTipoRepuestoToCollectionIfMissing([], tipoRepuesto, tipoRepuesto2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tipoRepuesto);
          expect(expectedResult).toContain(tipoRepuesto2);
        });

        it('should accept null and undefined values', () => {
          const tipoRepuesto: ITipoRepuesto = { id: 123 };
          expectedResult = service.addTipoRepuestoToCollectionIfMissing([], null, tipoRepuesto, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tipoRepuesto);
        });

        it('should return initial array if no TipoRepuesto is added', () => {
          const tipoRepuestoCollection: ITipoRepuesto[] = [{ id: 123 }];
          expectedResult = service.addTipoRepuestoToCollectionIfMissing(tipoRepuestoCollection, undefined, null);
          expect(expectedResult).toEqual(tipoRepuestoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
