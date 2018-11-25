/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { DocumentationTypeDetailComponent } from 'app/entities/documentation-type/documentation-type-detail.component';
import { DocumentationType } from 'app/shared/model/documentation-type.model';

describe('Component Tests', () => {
    describe('DocumentationType Management Detail Component', () => {
        let comp: DocumentationTypeDetailComponent;
        let fixture: ComponentFixture<DocumentationTypeDetailComponent>;
        const route = ({ data: of({ documentationType: new DocumentationType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [DocumentationTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DocumentationTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentationTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.documentationType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
