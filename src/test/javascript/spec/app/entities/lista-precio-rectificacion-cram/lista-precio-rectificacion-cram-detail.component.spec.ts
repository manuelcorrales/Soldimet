/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { ListaPrecioRectificacionCRAMDetailComponent } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram-detail.component';
import { ListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';

describe('Component Tests', () => {
    describe('ListaPrecioRectificacionCRAM Management Detail Component', () => {
        let comp: ListaPrecioRectificacionCRAMDetailComponent;
        let fixture: ComponentFixture<ListaPrecioRectificacionCRAMDetailComponent>;
        const route = ({ data: of({ listaPrecioRectificacionCRAM: new ListaPrecioRectificacionCRAM(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [ListaPrecioRectificacionCRAMDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ListaPrecioRectificacionCRAMDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ListaPrecioRectificacionCRAMDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.listaPrecioRectificacionCRAM).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
