/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { ListaPrecioRectificacionCRAMUpdateComponent } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram-update.component';
import { ListaPrecioRectificacionCRAMService } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.service';
import { ListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';

describe('Component Tests', () => {
    describe('ListaPrecioRectificacionCRAM Management Update Component', () => {
        let comp: ListaPrecioRectificacionCRAMUpdateComponent;
        let fixture: ComponentFixture<ListaPrecioRectificacionCRAMUpdateComponent>;
        let service: ListaPrecioRectificacionCRAMService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [ListaPrecioRectificacionCRAMUpdateComponent]
            })
                .overrideTemplate(ListaPrecioRectificacionCRAMUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ListaPrecioRectificacionCRAMUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListaPrecioRectificacionCRAMService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ListaPrecioRectificacionCRAM(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.listaPrecioRectificacionCRAM = entity;
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
                    const entity = new ListaPrecioRectificacionCRAM();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.listaPrecioRectificacionCRAM = entity;
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
