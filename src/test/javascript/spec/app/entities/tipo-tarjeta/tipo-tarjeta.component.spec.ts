/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { TipoTarjetaComponent } from 'app/entities/tipo-tarjeta/tipo-tarjeta.component';
import { TipoTarjetaService } from 'app/entities/tipo-tarjeta/tipo-tarjeta.service';
import { TipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';

describe('Component Tests', () => {
    describe('TipoTarjeta Management Component', () => {
        let comp: TipoTarjetaComponent;
        let fixture: ComponentFixture<TipoTarjetaComponent>;
        let service: TipoTarjetaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoTarjetaComponent],
                providers: []
            })
                .overrideTemplate(TipoTarjetaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoTarjetaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoTarjetaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TipoTarjeta(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tipoTarjetas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
