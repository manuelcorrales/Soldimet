/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoPresupuestoUpdateComponent } from 'app/entities/estado-presupuesto/estado-presupuesto-update.component';
import { EstadoPresupuestoService } from 'app/entities/estado-presupuesto/estado-presupuesto.service';
import { EstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';

describe('Component Tests', () => {
    describe('EstadoPresupuesto Management Update Component', () => {
        let comp: EstadoPresupuestoUpdateComponent;
        let fixture: ComponentFixture<EstadoPresupuestoUpdateComponent>;
        let service: EstadoPresupuestoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoPresupuestoUpdateComponent]
            })
                .overrideTemplate(EstadoPresupuestoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EstadoPresupuestoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoPresupuestoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EstadoPresupuesto(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.estadoPresupuesto = entity;
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
                    const entity = new EstadoPresupuesto();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.estadoPresupuesto = entity;
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
