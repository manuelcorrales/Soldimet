import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MedidaArticuloDetailComponent } from 'app/entities/medida-articulo/medida-articulo-detail.component';
import { MedidaArticulo } from 'app/shared/model/medida-articulo.model';

describe('Component Tests', () => {
  describe('MedidaArticulo Management Detail Component', () => {
    let comp: MedidaArticuloDetailComponent;
    let fixture: ComponentFixture<MedidaArticuloDetailComponent>;
    const route = ({ data: of({ medidaArticulo: new MedidaArticulo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MedidaArticuloDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MedidaArticuloDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedidaArticuloDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.medidaArticulo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
