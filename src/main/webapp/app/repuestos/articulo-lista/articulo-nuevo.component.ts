import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Articulo } from 'app/shared/model/articulo.model';
import { JhiAlertService } from 'ng-jhipster';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto';
import { TipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { RepuestosService } from '../repuestos-services';
import { Marca } from 'app/shared/model/marca.model';

@Component({
  selector: 'jhi-articulo-nuevo',
  templateUrl: './articulo-nuevo.component.html'
})
export class ArticuloNuevoComponent implements OnInit {
  articulo: Articulo = new Articulo();
  tiposRepuestos: TipoRepuesto[] = [];
  @Input() marca: Marca;
  @Output() eventoNuevoArticulo = new EventEmitter<Articulo>();

  constructor(
    private repuestosService: RepuestosService,
    private alertService: JhiAlertService,
    private tipoRepuestoService: TipoRepuestoService
  ) {}

  ngOnInit() {
    this.tipoRepuestoService.query().subscribe(res => {
      res.body.sort((a, b) => (b.nombreTipoRepuesto < a.nombreTipoRepuesto ? 1 : -1));
      this.tiposRepuestos = res.body;
    });
  }

  crearArticulo() {
    this.articulo.marca = this.marca;
    this.repuestosService.crearRepuestoProveedor(this.articulo).subscribe(
      (articulo: Articulo) => {
        this.articulo.fechaCosto = articulo.fechaCosto;
        this.articulo.id = articulo.id;
        this.eventoNuevoArticulo.emit(this.articulo);
        this.articulo = new Articulo();
        this.alertService.success('Se creo un artículo nuevo.');
      },

      error => {
        this.alertService.error(error.message);
      }
    );
  }
}
