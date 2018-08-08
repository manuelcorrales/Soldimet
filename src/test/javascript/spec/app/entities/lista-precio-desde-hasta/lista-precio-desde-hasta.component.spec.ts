/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { ListaPrecioDesdeHastaComponent } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.component';
import { ListaPrecioDesdeHastaService } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.service';
import { ListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';

describe('Component Tests', () => {
    describe('ListaPrecioDesdeHasta Management Component', () => {
        let comp: ListaPrecioDesdeHastaComponent;
        let fixture: ComponentFixture<ListaPrecioDesdeHastaComponent>;
        let service: ListaPrecioDesdeHastaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [ListaPrecioDesdeHastaComponent],
                providers: []
            })
                .overrideTemplate(ListaPrecioDesdeHastaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ListaPrecioDesdeHastaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListaPrecioDesdeHastaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ListaPrecioDesdeHasta(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.listaPrecioDesdeHastas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
