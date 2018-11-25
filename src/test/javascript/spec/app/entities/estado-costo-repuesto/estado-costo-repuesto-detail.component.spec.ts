/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoCostoRepuestoDetailComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto-detail.component';
import { EstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';

describe('Component Tests', () => {
    describe('EstadoCostoRepuesto Management Detail Component', () => {
        let comp: EstadoCostoRepuestoDetailComponent;
        let fixture: ComponentFixture<EstadoCostoRepuestoDetailComponent>;
        const route = ({ data: of({ estadoCostoRepuesto: new EstadoCostoRepuesto(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoCostoRepuestoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EstadoCostoRepuestoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EstadoCostoRepuestoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.estadoCostoRepuesto).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
