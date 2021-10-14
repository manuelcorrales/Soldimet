import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedioDePagoChequeDetailComponent } from './medio-de-pago-cheque-detail.component';

describe('Component Tests', () => {
  describe('MedioDePagoCheque Management Detail Component', () => {
    let comp: MedioDePagoChequeDetailComponent;
    let fixture: ComponentFixture<MedioDePagoChequeDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MedioDePagoChequeDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ medioDePagoCheque: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MedioDePagoChequeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedioDePagoChequeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load medioDePagoCheque on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.medioDePagoCheque).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
