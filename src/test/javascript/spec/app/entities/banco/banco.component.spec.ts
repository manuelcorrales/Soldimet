/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { BancoComponent } from 'app/entities/banco/banco.component';
import { BancoService } from 'app/entities/banco/banco.service';
import { Banco } from 'app/shared/model/banco.model';

describe('Component Tests', () => {
    describe('Banco Management Component', () => {
        let comp: BancoComponent;
        let fixture: ComponentFixture<BancoComponent>;
        let service: BancoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [BancoComponent],
                providers: []
            })
                .overrideTemplate(BancoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BancoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BancoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Banco(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.bancos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
