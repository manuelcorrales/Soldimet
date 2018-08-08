/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MovimientoPresupuestoDetailComponent } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto-detail.component';
import { MovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';

describe('Component Tests', () => {
    describe('MovimientoPresupuesto Management Detail Component', () => {
        let comp: MovimientoPresupuestoDetailComponent;
        let fixture: ComponentFixture<MovimientoPresupuestoDetailComponent>;
        const route = ({ data: of({ movimientoPresupuesto: new MovimientoPresupuesto(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MovimientoPresupuestoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MovimientoPresupuestoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MovimientoPresupuestoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.movimientoPresupuesto).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
