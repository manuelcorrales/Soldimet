/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { AplicacionDetailComponent } from 'app/entities/aplicacion/aplicacion-detail.component';
import { Aplicacion } from 'app/shared/model/aplicacion.model';

describe('Component Tests', () => {
    describe('Aplicacion Management Detail Component', () => {
        let comp: AplicacionDetailComponent;
        let fixture: ComponentFixture<AplicacionDetailComponent>;
        const route = ({ data: of({ aplicacion: new Aplicacion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [AplicacionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AplicacionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AplicacionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.aplicacion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
