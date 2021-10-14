import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedioDePagoDetailComponent } from './medio-de-pago-detail.component';

describe('Component Tests', () => {
  describe('MedioDePago Management Detail Component', () => {
    let comp: MedioDePagoDetailComponent;
    let fixture: ComponentFixture<MedioDePagoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MedioDePagoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ medioDePago: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MedioDePagoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedioDePagoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load medioDePago on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.medioDePago).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
