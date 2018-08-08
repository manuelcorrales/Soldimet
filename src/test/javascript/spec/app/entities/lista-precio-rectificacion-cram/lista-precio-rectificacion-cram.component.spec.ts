/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { ListaPrecioRectificacionCRAMComponent } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.component';
import { ListaPrecioRectificacionCRAMService } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.service';
import { ListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';

describe('Component Tests', () => {
    describe('ListaPrecioRectificacionCRAM Management Component', () => {
        let comp: ListaPrecioRectificacionCRAMComponent;
        let fixture: ComponentFixture<ListaPrecioRectificacionCRAMComponent>;
        let service: ListaPrecioRectificacionCRAMService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [ListaPrecioRectificacionCRAMComponent],
                providers: []
            })
                .overrideTemplate(ListaPrecioRectificacionCRAMComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ListaPrecioRectificacionCRAMComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListaPrecioRectificacionCRAMService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ListaPrecioRectificacionCRAM(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.listaPrecioRectificacionCRAMS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
