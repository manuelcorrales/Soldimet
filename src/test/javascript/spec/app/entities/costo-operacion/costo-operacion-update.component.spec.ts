/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CostoOperacionUpdateComponent } from 'app/entities/costo-operacion/costo-operacion-update.component';
import { CostoOperacionService } from 'app/entities/costo-operacion/costo-operacion.service';
import { CostoOperacion } from 'app/shared/model/costo-operacion.model';

describe('Component Tests', () => {
    describe('CostoOperacion Management Update Component', () => {
        let comp: CostoOperacionUpdateComponent;
        let fixture: ComponentFixture<CostoOperacionUpdateComponent>;
        let service: CostoOperacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CostoOperacionUpdateComponent]
            })
                .overrideTemplate(CostoOperacionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CostoOperacionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoOperacionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CostoOperacion(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.costoOperacion = entity;
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
                    const entity = new CostoOperacion();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.costoOperacion = entity;
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
