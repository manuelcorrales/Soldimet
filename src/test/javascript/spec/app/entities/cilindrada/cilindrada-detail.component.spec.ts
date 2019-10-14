import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CilindradaDetailComponent } from 'app/entities/cilindrada/cilindrada-detail.component';
import { Cilindrada } from 'app/shared/model/cilindrada.model';

describe('Component Tests', () => {
  describe('Cilindrada Management Detail Component', () => {
    let comp: CilindradaDetailComponent;
    let fixture: ComponentFixture<CilindradaDetailComponent>;
    const route = ({ data: of({ cilindrada: new Cilindrada(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CilindradaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CilindradaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CilindradaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cilindrada).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
