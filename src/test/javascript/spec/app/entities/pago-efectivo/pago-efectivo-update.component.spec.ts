/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { PagoEfectivoUpdateComponent } from 'app/entities/pago-efectivo/pago-efectivo-update.component';
import { PagoEfectivoService } from 'app/entities/pago-efectivo/pago-efectivo.service';
import { PagoEfectivo } from 'app/shared/model/pago-efectivo.model';

describe('Component Tests', () => {
    describe('PagoEfectivo Management Update Component', () => {
        let comp: PagoEfectivoUpdateComponent;
        let fixture: ComponentFixture<PagoEfectivoUpdateComponent>;
        let service: PagoEfectivoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PagoEfectivoUpdateComponent]
            })
                .overrideTemplate(PagoEfectivoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PagoEfectivoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagoEfectivoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PagoEfectivo(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pagoEfectivo = entity;
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
                    const entity = new PagoEfectivo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pagoEfectivo = entity;
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
