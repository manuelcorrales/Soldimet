/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoCobranzaOperacionUpdateComponent } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion-update.component';
import { EstadoCobranzaOperacionService } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion.service';
import { EstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';

describe('Component Tests', () => {
    describe('EstadoCobranzaOperacion Management Update Component', () => {
        let comp: EstadoCobranzaOperacionUpdateComponent;
        let fixture: ComponentFixture<EstadoCobranzaOperacionUpdateComponent>;
        let service: EstadoCobranzaOperacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoCobranzaOperacionUpdateComponent]
            })
                .overrideTemplate(EstadoCobranzaOperacionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EstadoCobranzaOperacionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoCobranzaOperacionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EstadoCobranzaOperacion(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.estadoCobranzaOperacion = entity;
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
                    const entity = new EstadoCobranzaOperacion();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.estadoCobranzaOperacion = entity;
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
