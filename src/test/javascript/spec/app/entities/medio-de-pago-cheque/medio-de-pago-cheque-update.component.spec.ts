/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MedioDePagoChequeUpdateComponent } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque-update.component';
import { MedioDePagoChequeService } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.service';
import { MedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';

describe('Component Tests', () => {
    describe('MedioDePagoCheque Management Update Component', () => {
        let comp: MedioDePagoChequeUpdateComponent;
        let fixture: ComponentFixture<MedioDePagoChequeUpdateComponent>;
        let service: MedioDePagoChequeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MedioDePagoChequeUpdateComponent]
            })
                .overrideTemplate(MedioDePagoChequeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedioDePagoChequeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedioDePagoChequeService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new MedioDePagoCheque(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.medioDePagoCheque = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new MedioDePagoCheque();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.medioDePagoCheque = entity;
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
