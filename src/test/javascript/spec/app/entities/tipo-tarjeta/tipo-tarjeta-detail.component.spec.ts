import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { TipoTarjetaDetailComponent } from 'app/entities/tipo-tarjeta/tipo-tarjeta-detail.component';
import { TipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';

describe('Component Tests', () => {
  describe('TipoTarjeta Management Detail Component', () => {
    let comp: TipoTarjetaDetailComponent;
    let fixture: ComponentFixture<TipoTarjetaDetailComponent>;
    const route = ({ data: of({ tipoTarjeta: new TipoTarjeta(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [TipoTarjetaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoTarjetaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoTarjetaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoTarjeta).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
