/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { TarjetaComponent } from 'app/entities/tarjeta/tarjeta.component';
import { TarjetaService } from 'app/entities/tarjeta/tarjeta.service';
import { Tarjeta } from 'app/shared/model/tarjeta.model';

describe('Component Tests', () => {
    describe('Tarjeta Management Component', () => {
        let comp: TarjetaComponent;
        let fixture: ComponentFixture<TarjetaComponent>;
        let service: TarjetaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TarjetaComponent],
                providers: []
            })
                .overrideTemplate(TarjetaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TarjetaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TarjetaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Tarjeta(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tarjetas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
