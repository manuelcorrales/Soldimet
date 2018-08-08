/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CajaUpdateComponent } from 'app/entities/caja/caja-update.component';
import { CajaService } from 'app/entities/caja/caja.service';
import { Caja } from 'app/shared/model/caja.model';

describe('Component Tests', () => {
    describe('Caja Management Update Component', () => {
        let comp: CajaUpdateComponent;
        let fixture: ComponentFixture<CajaUpdateComponent>;
        let service: CajaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CajaUpdateComponent]
            })
                .overrideTemplate(CajaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CajaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CajaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Caja(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.caja = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Caja();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.caja = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
