/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { RubroComponent } from 'app/entities/rubro/rubro.component';
import { RubroService } from 'app/entities/rubro/rubro.service';
import { Rubro } from 'app/shared/model/rubro.model';

describe('Component Tests', () => {
    describe('Rubro Management Component', () => {
        let comp: RubroComponent;
        let fixture: ComponentFixture<RubroComponent>;
        let service: RubroService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [RubroComponent],
                providers: []
            })
                .overrideTemplate(RubroComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RubroComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RubroService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Rubro(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.rubros[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
