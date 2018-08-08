/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { CobranzaOperacionComponent } from 'app/entities/cobranza-operacion/cobranza-operacion.component';
import { CobranzaOperacionService } from 'app/entities/cobranza-operacion/cobranza-operacion.service';
import { CobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';

describe('Component Tests', () => {
    describe('CobranzaOperacion Management Component', () => {
        let comp: CobranzaOperacionComponent;
        let fixture: ComponentFixture<CobranzaOperacionComponent>;
        let service: CobranzaOperacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CobranzaOperacionComponent],
                providers: []
            })
                .overrideTemplate(CobranzaOperacionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CobranzaOperacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CobranzaOperacionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CobranzaOperacion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cobranzaOperacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
