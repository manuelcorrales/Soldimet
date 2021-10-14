import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PagoTarjetaDetailComponent } from './pago-tarjeta-detail.component';

describe('Component Tests', () => {
  describe('PagoTarjeta Management Detail Component', () => {
    let comp: PagoTarjetaDetailComponent;
    let fixture: ComponentFixture<PagoTarjetaDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PagoTarjetaDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ pagoTarjeta: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(PagoTarjetaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagoTarjetaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pagoTarjeta on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pagoTarjeta).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
