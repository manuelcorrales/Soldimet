/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { PagoChequeUpdateComponent } from 'app/entities/pago-cheque/pago-cheque-update.component';
import { PagoChequeService } from 'app/entities/pago-cheque/pago-cheque.service';
import { PagoCheque } from 'app/shared/model/pago-cheque.model';

describe('Component Tests', () => {
    describe('PagoCheque Management Update Component', () => {
        let comp: PagoChequeUpdateComponent;
        let fixture: ComponentFixture<PagoChequeUpdateComponent>;
        let service: PagoChequeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PagoChequeUpdateComponent]
            })
                .overrideTemplate(PagoChequeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PagoChequeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagoChequeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PagoCheque(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pagoCheque = entity;
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
                    const entity = new PagoCheque();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pagoCheque = entity;
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
