/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { FormaDePagoUpdateComponent } from 'app/entities/forma-de-pago/forma-de-pago-update.component';
import { FormaDePagoService } from 'app/entities/forma-de-pago/forma-de-pago.service';
import { FormaDePago } from 'app/shared/model/forma-de-pago.model';

describe('Component Tests', () => {
    describe('FormaDePago Management Update Component', () => {
        let comp: FormaDePagoUpdateComponent;
        let fixture: ComponentFixture<FormaDePagoUpdateComponent>;
        let service: FormaDePagoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [FormaDePagoUpdateComponent]
            })
                .overrideTemplate(FormaDePagoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FormaDePagoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormaDePagoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FormaDePago(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.formaDePago = entity;
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
                    const entity = new FormaDePago();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.formaDePago = entity;
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
