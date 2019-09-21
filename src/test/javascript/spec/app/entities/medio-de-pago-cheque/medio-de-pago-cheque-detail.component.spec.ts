import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MedioDePagoChequeDetailComponent } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque-detail.component';
import { MedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';

describe('Component Tests', () => {
  describe('MedioDePagoCheque Management Detail Component', () => {
    let comp: MedioDePagoChequeDetailComponent;
    let fixture: ComponentFixture<MedioDePagoChequeDetailComponent>;
    const route = ({ data: of({ medioDePagoCheque: new MedioDePagoCheque(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MedioDePagoChequeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MedioDePagoChequeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedioDePagoChequeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.medioDePagoCheque).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
