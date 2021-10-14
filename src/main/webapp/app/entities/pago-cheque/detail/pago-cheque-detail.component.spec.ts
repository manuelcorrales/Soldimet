import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PagoChequeDetailComponent } from './pago-cheque-detail.component';

describe('Component Tests', () => {
  describe('PagoCheque Management Detail Component', () => {
    let comp: PagoChequeDetailComponent;
    let fixture: ComponentFixture<PagoChequeDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PagoChequeDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ pagoCheque: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(PagoChequeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagoChequeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pagoCheque on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pagoCheque).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
