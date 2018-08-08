/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MovimientoArticuloDetailComponent } from 'app/entities/movimiento-articulo/movimiento-articulo-detail.component';
import { MovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';

describe('Component Tests', () => {
    describe('MovimientoArticulo Management Detail Component', () => {
        let comp: MovimientoArticuloDetailComponent;
        let fixture: ComponentFixture<MovimientoArticuloDetailComponent>;
        const route = ({ data: of({ movimientoArticulo: new MovimientoArticulo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MovimientoArticuloDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MovimientoArticuloDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MovimientoArticuloDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.movimientoArticulo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
