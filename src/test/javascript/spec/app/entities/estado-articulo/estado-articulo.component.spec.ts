/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoArticuloComponent } from 'app/entities/estado-articulo/estado-articulo.component';
import { EstadoArticuloService } from 'app/entities/estado-articulo/estado-articulo.service';
import { EstadoArticulo } from 'app/shared/model/estado-articulo.model';

describe('Component Tests', () => {
    describe('EstadoArticulo Management Component', () => {
        let comp: EstadoArticuloComponent;
        let fixture: ComponentFixture<EstadoArticuloComponent>;
        let service: EstadoArticuloService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoArticuloComponent],
                providers: []
            })
                .overrideTemplate(EstadoArticuloComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EstadoArticuloComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoArticuloService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EstadoArticulo(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.estadoArticulos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
