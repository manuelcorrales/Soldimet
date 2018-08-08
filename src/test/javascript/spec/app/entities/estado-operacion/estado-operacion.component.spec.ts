/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoOperacionComponent } from 'app/entities/estado-operacion/estado-operacion.component';
import { EstadoOperacionService } from 'app/entities/estado-operacion/estado-operacion.service';
import { EstadoOperacion } from 'app/shared/model/estado-operacion.model';

describe('Component Tests', () => {
    describe('EstadoOperacion Management Component', () => {
        let comp: EstadoOperacionComponent;
        let fixture: ComponentFixture<EstadoOperacionComponent>;
        let service: EstadoOperacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoOperacionComponent],
                providers: []
            })
                .overrideTemplate(EstadoOperacionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EstadoOperacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoOperacionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EstadoOperacion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.estadoOperacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
