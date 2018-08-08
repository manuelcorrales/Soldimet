/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoCobranzaOperacionDetailComponent } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion-detail.component';
import { EstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';

describe('Component Tests', () => {
    describe('EstadoCobranzaOperacion Management Detail Component', () => {
        let comp: EstadoCobranzaOperacionDetailComponent;
        let fixture: ComponentFixture<EstadoCobranzaOperacionDetailComponent>;
        const route = ({ data: of({ estadoCobranzaOperacion: new EstadoCobranzaOperacion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoCobranzaOperacionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EstadoCobranzaOperacionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EstadoCobranzaOperacionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.estadoCobranzaOperacion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
