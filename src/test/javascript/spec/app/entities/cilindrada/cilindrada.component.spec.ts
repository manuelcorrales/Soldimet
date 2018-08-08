/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { CilindradaComponent } from 'app/entities/cilindrada/cilindrada.component';
import { CilindradaService } from 'app/entities/cilindrada/cilindrada.service';
import { Cilindrada } from 'app/shared/model/cilindrada.model';

describe('Component Tests', () => {
    describe('Cilindrada Management Component', () => {
        let comp: CilindradaComponent;
        let fixture: ComponentFixture<CilindradaComponent>;
        let service: CilindradaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CilindradaComponent],
                providers: []
            })
                .overrideTemplate(CilindradaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CilindradaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CilindradaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Cilindrada(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cilindradas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
