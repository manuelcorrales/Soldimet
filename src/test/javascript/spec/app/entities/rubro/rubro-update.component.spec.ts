/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { RubroUpdateComponent } from 'app/entities/rubro/rubro-update.component';
import { RubroService } from 'app/entities/rubro/rubro.service';
import { Rubro } from 'app/shared/model/rubro.model';

describe('Component Tests', () => {
    describe('Rubro Management Update Component', () => {
        let comp: RubroUpdateComponent;
        let fixture: ComponentFixture<RubroUpdateComponent>;
        let service: RubroService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [RubroUpdateComponent]
            })
                .overrideTemplate(RubroUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RubroUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RubroService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Rubro(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.rubro = entity;
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
                    const entity = new Rubro();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.rubro = entity;
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
