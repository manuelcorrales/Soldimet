/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { TipoParteMotorUpdateComponent } from 'app/entities/tipo-parte-motor/tipo-parte-motor-update.component';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/tipo-parte-motor.service';
import { TipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';

describe('Component Tests', () => {
    describe('TipoParteMotor Management Update Component', () => {
        let comp: TipoParteMotorUpdateComponent;
        let fixture: ComponentFixture<TipoParteMotorUpdateComponent>;
        let service: TipoParteMotorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoParteMotorUpdateComponent]
            })
                .overrideTemplate(TipoParteMotorUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoParteMotorUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoParteMotorService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TipoParteMotor(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoParteMotor = entity;
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
                    const entity = new TipoParteMotor();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoParteMotor = entity;
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
