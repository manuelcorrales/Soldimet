/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { BancoDetailComponent } from 'app/entities/banco/banco-detail.component';
import { Banco } from 'app/shared/model/banco.model';

describe('Component Tests', () => {
    describe('Banco Management Detail Component', () => {
        let comp: BancoDetailComponent;
        let fixture: ComponentFixture<BancoDetailComponent>;
        const route = ({ data: of({ banco: new Banco(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [BancoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BancoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BancoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.banco).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
