/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoMovimientoUpdateComponent } from 'app/entities/estado-movimiento/estado-movimiento-update.component';
import { EstadoMovimientoService } from 'app/entities/estado-movimiento/estado-movimiento.service';
import { EstadoMovimiento } from 'app/shared/model/estado-movimiento.model';

describe('Component Tests', () => {
    describe('EstadoMovimiento Management Update Component', () => {
        let comp: EstadoMovimientoUpdateComponent;
        let fixture: ComponentFixture<EstadoMovimientoUpdateComponent>;
        let service: EstadoMovimientoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoMovimientoUpdateComponent]
            })
                .overrideTemplate(EstadoMovimientoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EstadoMovimientoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoMovimientoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EstadoMovimiento(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.estadoMovimiento = entity;
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
                    const entity = new EstadoMovimiento();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.estadoMovimiento = entity;
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
