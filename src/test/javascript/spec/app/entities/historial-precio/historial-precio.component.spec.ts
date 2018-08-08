/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { HistorialPrecioComponent } from 'app/entities/historial-precio/historial-precio.component';
import { HistorialPrecioService } from 'app/entities/historial-precio/historial-precio.service';
import { HistorialPrecio } from 'app/shared/model/historial-precio.model';

describe('Component Tests', () => {
    describe('HistorialPrecio Management Component', () => {
        let comp: HistorialPrecioComponent;
        let fixture: ComponentFixture<HistorialPrecioComponent>;
        let service: HistorialPrecioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [HistorialPrecioComponent],
                providers: []
            })
                .overrideTemplate(HistorialPrecioComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HistorialPrecioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistorialPrecioService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HistorialPrecio(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.historialPrecios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
