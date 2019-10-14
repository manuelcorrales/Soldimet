import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { MedioDePagoChequeComponent } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.component';
import { MedioDePagoChequeService } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.service';
import { MedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';

describe('Component Tests', () => {
  describe('MedioDePagoCheque Management Component', () => {
    let comp: MedioDePagoChequeComponent;
    let fixture: ComponentFixture<MedioDePagoChequeComponent>;
    let service: MedioDePagoChequeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MedioDePagoChequeComponent],
        providers: []
      })
        .overrideTemplate(MedioDePagoChequeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedioDePagoChequeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedioDePagoChequeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MedioDePagoCheque(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.medioDePagoCheques[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
