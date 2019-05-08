/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MedioDePagoTarjetaUpdateComponent } from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta-update.component';
import { MedioDePagoTarjetaService } from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta.service';
import { MedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';

describe('Component Tests', () => {
    describe('MedioDePagoTarjeta Management Update Component', () => {
        let comp: MedioDePagoTarjetaUpdateComponent;
        let fixture: ComponentFixture<MedioDePagoTarjetaUpdateComponent>;
        let service: MedioDePagoTarjetaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MedioDePagoTarjetaUpdateComponent]
            })
                .overrideTemplate(MedioDePagoTarjetaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedioDePagoTarjetaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedioDePagoTarjetaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new MedioDePagoTarjeta(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.medioDePagoTarjeta = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new MedioDePagoTarjeta();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.medioDePagoTarjeta = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
