/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { AplicacionUpdateComponent } from 'app/entities/aplicacion/aplicacion-update.component';
import { AplicacionService } from 'app/entities/aplicacion/aplicacion.service';
import { Aplicacion } from 'app/shared/model/aplicacion.model';

describe('Component Tests', () => {
    describe('Aplicacion Management Update Component', () => {
        let comp: AplicacionUpdateComponent;
        let fixture: ComponentFixture<AplicacionUpdateComponent>;
        let service: AplicacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [AplicacionUpdateComponent]
            })
                .overrideTemplate(AplicacionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AplicacionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AplicacionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Aplicacion(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.aplicacion = entity;
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
                    const entity = new Aplicacion();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.aplicacion = entity;
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
