import { Component, OnInit, ViewContainerRef, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService } from 'ng-jhipster';
import { ArticuloService } from 'app/entities/articulo';
import { Marca } from 'app/shared/model/marca.model';
import { UpdateRepuestosListComponent } from '../update-repuestos-list/update-repuestos-list.component';
import { Articulo } from 'app/shared/model/articulo.model';
import { RepuestosService } from '../repuestos-services';
import { TipoRepuesto } from '../../shared/model/tipo-repuesto.model';
import { BaseFilterPageableComponent } from '../../shared/base-filter-pageable/base-filter-pageable.component';
import { Page } from '../../dto/page/page';

@Component({
  selector: 'jhi-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.scss'],
})
export class ListaArticulosComponent extends BaseFilterPageableComponent<Articulo> implements OnInit {
  @ViewChild('toastr', { static: false })
  toastrContainer: ViewContainerRef;

  @Input() marca: Marca;
  tipoRepuestos: TipoRepuesto[] = [];
  repuestoElegido: TipoRepuesto;

  busqueda = '';
  pageSize = 30;
  page = 1;

  constructor(
    protected articuloService: ArticuloService,
    public alertService: JhiAlertService,
    private modalService: NgbModal,
    private repuestosService: RepuestosService
  ) {
    super();
    this.searchableService = repuestosService;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public requestContent() {
    this.searchableService.findByFilteredPage(this.marca, this.searchText, this.page - 1, this.pageSize).subscribe(
      (response: Page<Articulo>) => {
        this.totalItems = response.totalElements;
        this.content = response.content;
        this.filtrarTiposRepuesto();
      },
      error => this.onError(error.message)
    );
  }

  public filtrarTiposRepuesto() {
    this.content
      .map((articulo: Articulo) => articulo.tipoRepuesto)
      .forEach((repuesto: TipoRepuesto) => {
        if (!this.tipoRepuestos.some(repList => repList.id === repuesto.id)) {
          this.tipoRepuestos.push(repuesto);
        }
      });
  }

  modificarPorcentageLista(marca: Marca, porcentage: number) {
    const modal = this.modalService.open(UpdateRepuestosListComponent, { size: 'lg' });
    modal.componentInstance.marca = marca;
    modal.componentInstance.porcentage = porcentage;
    modal.componentInstance.tipoRepuesto = this.repuestoElegido;
    modal.result.then(
      res => {
        this.guardarLista(marca, porcentage);
      },
      dismiss => {
        porcentage = 0;
      }
    );
  }

  guardarLista(marca: Marca, porcentage: number) {
    const articulos: Articulo[] = this.content.filter(articulo => articulo.tipoRepuesto.id === this.repuestoElegido.id);
    articulos.forEach(articulo => (articulo.valor = articulo.valor * (1 + porcentage / 100)));
    this.repuestosService.saveListaActualizada(articulos).subscribe((articulosRes: Articulo[]) => {
      this.requestContent();
    });
  }

  actualizarArticulo(articulo: Articulo) {
    this.repuestosService.actualizarRepuestoProveedor(articulo).subscribe((resArticulo: Articulo) => {
      this.requestContent();
      this.alertService.success('Se actualizó un artículo');
    });
  }

  cancelarArticulo(articulo: Articulo) {
    // llamo al back para fletarlo y lo saco de la lista
    this.articuloService.delete(articulo.id).subscribe(res => {
      this.requestContent();
      this.alertService.success('Se eliminó un artículo');
    });
  }
}
