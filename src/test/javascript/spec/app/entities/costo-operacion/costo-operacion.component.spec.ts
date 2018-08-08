/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { CostoOperacionComponent } from 'app/entities/costo-operacion/costo-operacion.component';
import { CostoOperacionService } from 'app/entities/costo-operacion/costo-operacion.service';
import { CostoOperacion } from 'app/shared/model/costo-operacion.model';

describe('Component Tests', () => {
    describe('CostoOperacion Management Component', () => {
        let comp: CostoOperacionComponent;
        let fixture: ComponentFixture<CostoOperacionComponent>;
        let service: CostoOperacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CostoOperacionComponent],
                providers: []
            })
                .overrideTemplate(CostoOperacionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CostoOperacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoOperacionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CostoOperacion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.costoOperacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
