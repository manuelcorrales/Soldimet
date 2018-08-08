/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { AplicacionComponent } from 'app/entities/aplicacion/aplicacion.component';
import { AplicacionService } from 'app/entities/aplicacion/aplicacion.service';
import { Aplicacion } from 'app/shared/model/aplicacion.model';

describe('Component Tests', () => {
    describe('Aplicacion Management Component', () => {
        let comp: AplicacionComponent;
        let fixture: ComponentFixture<AplicacionComponent>;
        let service: AplicacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [AplicacionComponent],
                providers: []
            })
                .overrideTemplate(AplicacionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AplicacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AplicacionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Aplicacion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.aplicacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
