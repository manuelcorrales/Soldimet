/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { TipoMovimientoUpdateComponent } from 'app/entities/tipo-movimiento/tipo-movimiento-update.component';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento/tipo-movimiento.service';
import { TipoMovimiento } from 'app/shared/model/tipo-movimiento.model';

describe('Component Tests', () => {
    describe('TipoMovimiento Management Update Component', () => {
        let comp: TipoMovimientoUpdateComponent;
        let fixture: ComponentFixture<TipoMovimientoUpdateComponent>;
        let service: TipoMovimientoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoMovimientoUpdateComponent]
            })
                .overrideTemplate(TipoMovimientoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoMovimientoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoMovimientoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TipoMovimiento(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoMovimiento = entity;
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
                    const entity = new TipoMovimiento();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoMovimiento = entity;
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
