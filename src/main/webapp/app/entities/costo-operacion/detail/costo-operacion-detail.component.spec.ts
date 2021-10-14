import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CostoOperacionDetailComponent } from './costo-operacion-detail.component';

describe('Component Tests', () => {
  describe('CostoOperacion Management Detail Component', () => {
    let comp: CostoOperacionDetailComponent;
    let fixture: ComponentFixture<CostoOperacionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CostoOperacionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ costoOperacion: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CostoOperacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CostoOperacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load costoOperacion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.costoOperacion).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
