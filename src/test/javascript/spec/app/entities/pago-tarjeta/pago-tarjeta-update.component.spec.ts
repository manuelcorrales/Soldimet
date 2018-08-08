/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { PagoTarjetaUpdateComponent } from 'app/entities/pago-tarjeta/pago-tarjeta-update.component';
import { PagoTarjetaService } from 'app/entities/pago-tarjeta/pago-tarjeta.service';
import { PagoTarjeta } from 'app/shared/model/pago-tarjeta.model';

describe('Component Tests', () => {
    describe('PagoTarjeta Management Update Component', () => {
        let comp: PagoTarjetaUpdateComponent;
        let fixture: ComponentFixture<PagoTarjetaUpdateComponent>;
        let service: PagoTarjetaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PagoTarjetaUpdateComponent]
            })
                .overrideTemplate(PagoTarjetaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PagoTarjetaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagoTarjetaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PagoTarjeta(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pagoTarjeta = entity;
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
                    const entity = new PagoTarjeta();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pagoTarjeta = entity;
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
