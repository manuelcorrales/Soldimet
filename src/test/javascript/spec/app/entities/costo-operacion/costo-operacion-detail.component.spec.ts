import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CostoOperacionDetailComponent } from 'app/entities/costo-operacion/costo-operacion-detail.component';
import { CostoOperacion } from 'app/shared/model/costo-operacion.model';

describe('Component Tests', () => {
  describe('CostoOperacion Management Detail Component', () => {
    let comp: CostoOperacionDetailComponent;
    let fixture: ComponentFixture<CostoOperacionDetailComponent>;
    const route = ({ data: of({ costoOperacion: new CostoOperacion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CostoOperacionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CostoOperacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CostoOperacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.costoOperacion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
