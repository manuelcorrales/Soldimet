/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { PrecioRepuestoComponent } from 'app/entities/precio-repuesto/precio-repuesto.component';
import { PrecioRepuestoService } from 'app/entities/precio-repuesto/precio-repuesto.service';
import { PrecioRepuesto } from 'app/shared/model/precio-repuesto.model';

describe('Component Tests', () => {
    describe('PrecioRepuesto Management Component', () => {
        let comp: PrecioRepuestoComponent;
        let fixture: ComponentFixture<PrecioRepuestoComponent>;
        let service: PrecioRepuestoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PrecioRepuestoComponent],
                providers: []
            })
                .overrideTemplate(PrecioRepuestoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrecioRepuestoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecioRepuestoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PrecioRepuesto(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.precioRepuestos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
