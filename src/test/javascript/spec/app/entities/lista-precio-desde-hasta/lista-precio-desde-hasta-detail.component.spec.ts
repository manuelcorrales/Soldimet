/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { ListaPrecioDesdeHastaDetailComponent } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta-detail.component';
import { ListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';

describe('Component Tests', () => {
    describe('ListaPrecioDesdeHasta Management Detail Component', () => {
        let comp: ListaPrecioDesdeHastaDetailComponent;
        let fixture: ComponentFixture<ListaPrecioDesdeHastaDetailComponent>;
        const route = ({ data: of({ listaPrecioDesdeHasta: new ListaPrecioDesdeHasta(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [ListaPrecioDesdeHastaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ListaPrecioDesdeHastaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ListaPrecioDesdeHastaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.listaPrecioDesdeHasta).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
