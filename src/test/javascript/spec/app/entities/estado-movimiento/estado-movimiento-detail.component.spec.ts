/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoMovimientoDetailComponent } from 'app/entities/estado-movimiento/estado-movimiento-detail.component';
import { EstadoMovimiento } from 'app/shared/model/estado-movimiento.model';

describe('Component Tests', () => {
    describe('EstadoMovimiento Management Detail Component', () => {
        let comp: EstadoMovimientoDetailComponent;
        let fixture: ComponentFixture<EstadoMovimientoDetailComponent>;
        const route = ({ data: of({ estadoMovimiento: new EstadoMovimiento(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoMovimientoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EstadoMovimientoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EstadoMovimientoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.estadoMovimiento).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
