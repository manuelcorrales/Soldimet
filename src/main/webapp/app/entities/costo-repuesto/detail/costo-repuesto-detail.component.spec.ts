import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CostoRepuestoDetailComponent } from './costo-repuesto-detail.component';

describe('Component Tests', () => {
  describe('CostoRepuesto Management Detail Component', () => {
    let comp: CostoRepuestoDetailComponent;
    let fixture: ComponentFixture<CostoRepuestoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CostoRepuestoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ costoRepuesto: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CostoRepuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CostoRepuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load costoRepuesto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.costoRepuesto).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
