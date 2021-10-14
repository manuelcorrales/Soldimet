import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDocumentationType, DocumentationType } from '../documentation-type.model';

import { DocumentationTypeService } from './documentation-type.service';

describe('Service Tests', () => {
  describe('DocumentationType Service', () => {
    let service: DocumentationTypeService;
    let httpMock: HttpTestingController;
    let elemDefault: IDocumentationType;
    let expectedResult: IDocumentationType | IDocumentationType[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DocumentationTypeService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        documentName: 'AAAAAAA',
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

      it('should create a DocumentationType', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DocumentationType()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DocumentationType', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            documentName: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a DocumentationType', () => {
        const patchObject = Object.assign({}, new DocumentationType());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DocumentationType', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            documentName: 'BBBBBB',
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

      it('should delete a DocumentationType', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDocumentationTypeToCollectionIfMissing', () => {
        it('should add a DocumentationType to an empty array', () => {
          const documentationType: IDocumentationType = { id: 123 };
          expectedResult = service.addDocumentationTypeToCollectionIfMissing([], documentationType);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(documentationType);
        });

        it('should not add a DocumentationType to an array that contains it', () => {
          const documentationType: IDocumentationType = { id: 123 };
          const documentationTypeCollection: IDocumentationType[] = [
            {
              ...documentationType,
            },
            { id: 456 },
          ];
          expectedResult = service.addDocumentationTypeToCollectionIfMissing(documentationTypeCollection, documentationType);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a DocumentationType to an array that doesn't contain it", () => {
          const documentationType: IDocumentationType = { id: 123 };
          const documentationTypeCollection: IDocumentationType[] = [{ id: 456 }];
          expectedResult = service.addDocumentationTypeToCollectionIfMissing(documentationTypeCollection, documentationType);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(documentationType);
        });

        it('should add only unique DocumentationType to an array', () => {
          const documentationTypeArray: IDocumentationType[] = [{ id: 123 }, { id: 456 }, { id: 40623 }];
          const documentationTypeCollection: IDocumentationType[] = [{ id: 123 }];
          expectedResult = service.addDocumentationTypeToCollectionIfMissing(documentationTypeCollection, ...documentationTypeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const documentationType: IDocumentationType = { id: 123 };
          const documentationType2: IDocumentationType = { id: 456 };
          expectedResult = service.addDocumentationTypeToCollectionIfMissing([], documentationType, documentationType2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(documentationType);
          expect(expectedResult).toContain(documentationType2);
        });

        it('should accept null and undefined values', () => {
          const documentationType: IDocumentationType = { id: 123 };
          expectedResult = service.addDocumentationTypeToCollectionIfMissing([], null, documentationType, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(documentationType);
        });

        it('should return initial array if no DocumentationType is added', () => {
          const documentationTypeCollection: IDocumentationType[] = [{ id: 123 }];
          expectedResult = service.addDocumentationTypeToCollectionIfMissing(documentationTypeCollection, undefined, null);
          expect(expectedResult).toEqual(documentationTypeCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
