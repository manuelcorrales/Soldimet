/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MovimientoArticuloUpdateComponent } from 'app/entities/movimiento-articulo/movimiento-articulo-update.component';
import { MovimientoArticuloService } from 'app/entities/movimiento-articulo/movimiento-articulo.service';
import { MovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';

describe('Component Tests', () => {
    describe('MovimientoArticulo Management Update Component', () => {
        let comp: MovimientoArticuloUpdateComponent;
        let fixture: ComponentFixture<MovimientoArticuloUpdateComponent>;
        let service: MovimientoArticuloService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MovimientoArticuloUpdateComponent]
            })
                .overrideTemplate(MovimientoArticuloUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MovimientoArticuloUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovimientoArticuloService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MovimientoArticulo(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.movimientoArticulo = entity;
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
                    const entity = new MovimientoArticulo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.movimientoArticulo = entity;
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
