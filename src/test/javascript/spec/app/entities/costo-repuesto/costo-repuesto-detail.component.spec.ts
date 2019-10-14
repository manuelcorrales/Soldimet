import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CostoRepuestoDetailComponent } from 'app/entities/costo-repuesto/costo-repuesto-detail.component';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';

describe('Component Tests', () => {
  describe('CostoRepuesto Management Detail Component', () => {
    let comp: CostoRepuestoDetailComponent;
    let fixture: ComponentFixture<CostoRepuestoDetailComponent>;
    const route = ({ data: of({ costoRepuesto: new CostoRepuesto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CostoRepuestoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CostoRepuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CostoRepuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.costoRepuesto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
