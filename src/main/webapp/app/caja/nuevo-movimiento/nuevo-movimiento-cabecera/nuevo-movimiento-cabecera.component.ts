import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { CategoriaPago } from 'app/shared/model/categoria-pago.model';
import { SubCategoria } from 'app/shared/model/sub-categoria.model';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { TipoMovimientoService } from '../../../entities/tipo-movimiento/tipo-movimiento.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ITipoMovimiento } from '../../../shared/model/tipo-movimiento.model';
import { CategoriaPagoService } from '../../../entities/categoria-pago/categoria-pago.service';
import { JhiAlertService } from 'ng-jhipster';
import { ICategoriaPago } from '../../../shared/model/categoria-pago.model';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Observable, Subject, merge } from 'rxjs';

@Component({
  selector: 'jhi-nuevo-movimiento-cabecera',
  templateUrl: './nuevo-movimiento-cabecera.component.html',
  styleUrls: ['./nuevo-movimiento-cabecera.component.scss'],
})
export class NuevoMovimientoCabeceraComponent implements OnInit {
  tipos: TipoMovimiento[];
  categorias: CategoriaPago[];
  conceptos: SubCategoria[];

  public categoria: CategoriaPago;
  public tipoMovimiento: TipoMovimiento;
  public concepto: SubCategoria;
  public importe: number;

  @ViewChild('instanceNTAconcepto', { static: false })
  instanceconcepto: NgbTypeahead;
  focusconcepto$ = new Subject<string>();
  clickconcepto$ = new Subject<string>();

  constructor(
    private tipoMovimientoService: TipoMovimientoService,
    private categoriaService: CategoriaPagoService,
    private jhiAlertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.tipoMovimientoService.query().subscribe(
      (res: HttpResponse<ITipoMovimiento[]>) => {
        this.tipos = res.body;
      },
      (res: HttpErrorResponse) => this.jhiAlertService.error(res.message)
    );
    this.categoriaService.query().subscribe(
      (res: HttpResponse<ICategoriaPago[]>) => {
        this.categorias = res.body;
      },
      (res: HttpErrorResponse) => this.jhiAlertService.error(res.message)
    );
  }

  buscarSubCategorias() {
    this.conceptos = this.categoria.subCategorias;
    this.concepto = null;
  }

  formatterconcepto = result => result.nombreSubCategoria;
  searchconcepto = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickconcepto$.pipe(filter(() => !this.instanceconcepto.isPopupOpen()));
    const inputFocus$ = this.focusconcepto$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ''
          ? this.conceptos
          : // es-lint-ignore-next-line prefer-includes
            this.conceptos.filter(v => v.nombreSubCategoria.toLowerCase().includes(term.toLowerCase()))
        ).slice(0, 10)
      )
    );
  };

  async preGuardar() {
    if (typeof this.concepto === 'string') {
      const nombreSubCategoria = this.concepto as string;
      this.concepto = new SubCategoria();
      this.concepto.nombreSubCategoria = nombreSubCategoria;
      // agrego la subcategoria a la lista en categoria
      this.categoria.subCategorias.push(this.concepto);
      const response = await this.categoriaService.update(this.categoria).toPromise();
      this.categoria = response.body;
      this.concepto = this.categoria.subCategorias.find(sub => sub.nombreSubCategoria === this.concepto.nombreSubCategoria);
    }
  }
}
