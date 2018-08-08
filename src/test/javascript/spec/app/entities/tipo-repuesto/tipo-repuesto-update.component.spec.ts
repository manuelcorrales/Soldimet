/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { TipoRepuestoUpdateComponent } from 'app/entities/tipo-repuesto/tipo-repuesto-update.component';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/tipo-repuesto.service';
import { TipoRepuesto } from 'app/shared/model/tipo-repuesto.model';

describe('Component Tests', () => {
    describe('TipoRepuesto Management Update Component', () => {
        let comp: TipoRepuestoUpdateComponent;
        let fixture: ComponentFixture<TipoRepuestoUpdateComponent>;
        let service: TipoRepuestoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoRepuestoUpdateComponent]
            })
                .overrideTemplate(TipoRepuestoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoRepuestoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoRepuestoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TipoRepuesto(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoRepuesto = entity;
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
                    const entity = new TipoRepuesto();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoRepuesto = entity;
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
