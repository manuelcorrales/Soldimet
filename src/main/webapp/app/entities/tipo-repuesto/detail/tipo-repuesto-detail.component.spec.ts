import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TipoRepuestoDetailComponent } from './tipo-repuesto-detail.component';

describe('Component Tests', () => {
  describe('TipoRepuesto Management Detail Component', () => {
    let comp: TipoRepuestoDetailComponent;
    let fixture: ComponentFixture<TipoRepuestoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TipoRepuestoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ tipoRepuesto: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TipoRepuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoRepuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoRepuesto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoRepuesto).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
