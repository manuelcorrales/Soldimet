/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { CostoRepuestoComponent } from 'app/entities/costo-repuesto/costo-repuesto.component';
import { CostoRepuestoService } from 'app/entities/costo-repuesto/costo-repuesto.service';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';

describe('Component Tests', () => {
    describe('CostoRepuesto Management Component', () => {
        let comp: CostoRepuestoComponent;
        let fixture: ComponentFixture<CostoRepuestoComponent>;
        let service: CostoRepuestoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CostoRepuestoComponent],
                providers: []
            })
                .overrideTemplate(CostoRepuestoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CostoRepuestoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoRepuestoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CostoRepuesto(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.costoRepuestos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
