/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CilindradaUpdateComponent } from 'app/entities/cilindrada/cilindrada-update.component';
import { CilindradaService } from 'app/entities/cilindrada/cilindrada.service';
import { Cilindrada } from 'app/shared/model/cilindrada.model';

describe('Component Tests', () => {
    describe('Cilindrada Management Update Component', () => {
        let comp: CilindradaUpdateComponent;
        let fixture: ComponentFixture<CilindradaUpdateComponent>;
        let service: CilindradaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CilindradaUpdateComponent]
            })
                .overrideTemplate(CilindradaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CilindradaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CilindradaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Cilindrada(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cilindrada = entity;
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
                    const entity = new Cilindrada();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cilindrada = entity;
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
