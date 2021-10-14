jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { RubroService } from '../service/rubro.service';
import { IRubro, Rubro } from '../rubro.model';

import { RubroUpdateComponent } from './rubro-update.component';

describe('Component Tests', () => {
  describe('Rubro Management Update Component', () => {
    let comp: RubroUpdateComponent;
    let fixture: ComponentFixture<RubroUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let rubroService: RubroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RubroUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(RubroUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RubroUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      rubroService = TestBed.inject(RubroService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const rubro: IRubro = { id: 456 };

        activatedRoute.data = of({ rubro });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(rubro));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Rubro>>();
        const rubro = { id: 123 };
        jest.spyOn(rubroService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ rubro });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: rubro }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(rubroService.update).toHaveBeenCalledWith(rubro);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Rubro>>();
        const rubro = new Rubro();
        jest.spyOn(rubroService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ rubro });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: rubro }));
        saveSubject.complete();

        // THEN
        expect(rubroService.create).toHaveBeenCalledWith(rubro);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Rubro>>();
        const rubro = { id: 123 };
        jest.spyOn(rubroService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ rubro });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(rubroService.update).toHaveBeenCalledWith(rubro);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
