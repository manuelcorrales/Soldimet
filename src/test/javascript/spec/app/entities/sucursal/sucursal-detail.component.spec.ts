import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { SucursalDetailComponent } from 'app/entities/sucursal/sucursal-detail.component';
import { Sucursal } from 'app/shared/model/sucursal.model';

describe('Component Tests', () => {
  describe('Sucursal Management Detail Component', () => {
    let comp: SucursalDetailComponent;
    let fixture: ComponentFixture<SucursalDetailComponent>;
    const route = ({ data: of({ sucursal: new Sucursal(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [SucursalDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SucursalDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SucursalDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sucursal).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
