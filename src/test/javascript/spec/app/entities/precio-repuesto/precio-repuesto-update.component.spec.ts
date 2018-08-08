/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { PrecioRepuestoUpdateComponent } from 'app/entities/precio-repuesto/precio-repuesto-update.component';
import { PrecioRepuestoService } from 'app/entities/precio-repuesto/precio-repuesto.service';
import { PrecioRepuesto } from 'app/shared/model/precio-repuesto.model';

describe('Component Tests', () => {
    describe('PrecioRepuesto Management Update Component', () => {
        let comp: PrecioRepuestoUpdateComponent;
        let fixture: ComponentFixture<PrecioRepuestoUpdateComponent>;
        let service: PrecioRepuestoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PrecioRepuestoUpdateComponent]
            })
                .overrideTemplate(PrecioRepuestoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrecioRepuestoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecioRepuestoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrecioRepuesto(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.precioRepuesto = entity;
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
                    const entity = new PrecioRepuesto();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.precioRepuesto = entity;
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
