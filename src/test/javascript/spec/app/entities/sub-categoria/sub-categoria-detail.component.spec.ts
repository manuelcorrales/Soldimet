/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { SubCategoriaDetailComponent } from 'app/entities/sub-categoria/sub-categoria-detail.component';
import { SubCategoria } from 'app/shared/model/sub-categoria.model';

describe('Component Tests', () => {
    describe('SubCategoria Management Detail Component', () => {
        let comp: SubCategoriaDetailComponent;
        let fixture: ComponentFixture<SubCategoriaDetailComponent>;
        const route = ({ data: of({ subCategoria: new SubCategoria(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [SubCategoriaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SubCategoriaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubCategoriaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.subCategoria).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
