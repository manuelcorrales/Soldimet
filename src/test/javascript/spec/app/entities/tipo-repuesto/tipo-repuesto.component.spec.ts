/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { TipoRepuestoComponent } from 'app/entities/tipo-repuesto/tipo-repuesto.component';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/tipo-repuesto.service';
import { TipoRepuesto } from 'app/shared/model/tipo-repuesto.model';

describe('Component Tests', () => {
    describe('TipoRepuesto Management Component', () => {
        let comp: TipoRepuestoComponent;
        let fixture: ComponentFixture<TipoRepuestoComponent>;
        let service: TipoRepuestoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoRepuestoComponent],
                providers: []
            })
                .overrideTemplate(TipoRepuestoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoRepuestoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoRepuestoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TipoRepuesto(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tipoRepuestos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
