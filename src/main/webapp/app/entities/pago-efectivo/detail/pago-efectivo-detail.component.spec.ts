import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PagoEfectivoDetailComponent } from './pago-efectivo-detail.component';

describe('Component Tests', () => {
  describe('PagoEfectivo Management Detail Component', () => {
    let comp: PagoEfectivoDetailComponent;
    let fixture: ComponentFixture<PagoEfectivoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PagoEfectivoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ pagoEfectivo: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(PagoEfectivoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagoEfectivoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pagoEfectivo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pagoEfectivo).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
