/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoArticuloUpdateComponent } from 'app/entities/estado-articulo/estado-articulo-update.component';
import { EstadoArticuloService } from 'app/entities/estado-articulo/estado-articulo.service';
import { EstadoArticulo } from 'app/shared/model/estado-articulo.model';

describe('Component Tests', () => {
    describe('EstadoArticulo Management Update Component', () => {
        let comp: EstadoArticuloUpdateComponent;
        let fixture: ComponentFixture<EstadoArticuloUpdateComponent>;
        let service: EstadoArticuloService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoArticuloUpdateComponent]
            })
                .overrideTemplate(EstadoArticuloUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EstadoArticuloUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoArticuloService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EstadoArticulo(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.estadoArticulo = entity;
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
                    const entity = new EstadoArticulo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.estadoArticulo = entity;
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
