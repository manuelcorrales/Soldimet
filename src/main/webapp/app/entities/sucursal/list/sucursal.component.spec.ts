import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SucursalService } from '../service/sucursal.service';

import { SucursalComponent } from './sucursal.component';

describe('Component Tests', () => {
  describe('Sucursal Management Component', () => {
    let comp: SucursalComponent;
    let fixture: ComponentFixture<SucursalComponent>;
    let service: SucursalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SucursalComponent],
      })
        .overrideTemplate(SucursalComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SucursalComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SucursalService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sucursals?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
