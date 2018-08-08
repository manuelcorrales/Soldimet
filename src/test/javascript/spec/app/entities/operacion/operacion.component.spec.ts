/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { OperacionComponent } from 'app/entities/operacion/operacion.component';
import { OperacionService } from 'app/entities/operacion/operacion.service';
import { Operacion } from 'app/shared/model/operacion.model';

describe('Component Tests', () => {
    describe('Operacion Management Component', () => {
        let comp: OperacionComponent;
        let fixture: ComponentFixture<OperacionComponent>;
        let service: OperacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [OperacionComponent],
                providers: []
            })
                .overrideTemplate(OperacionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OperacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperacionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Operacion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.operacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
