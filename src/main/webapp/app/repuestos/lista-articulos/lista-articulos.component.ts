import { Component, OnInit, ViewContainerRef, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService } from 'ng-jhipster';
import { ArticuloService } from 'app/entities/articulo';
import { Marca } from 'app/shared/model/marca.model';
import { UpdateRepuestosListComponent } from '../update-repuestos-list/update-repuestos-list.component';
import { Articulo } from 'app/shared/model/articulo.model';
import { RepuestosService } from '../repuestos-services';
import { TipoRepuesto } from '../../shared/model/tipo-repuesto.model';

@Component({
  selector: 'jhi-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.scss']
})
export class ListaArticulosComponent implements OnInit {
  @ViewChild('toastr', { static: false })
  toastrContainer: ViewContainerRef;

  @Input() totalArticulosPorMarca: Articulo[] = [];
  @Input() marca: Marca;
  articulosPorMarca: Articulo[] = [];
  tipoRepuestos: TipoRepuesto[] = [];
  repuestoElegido: TipoRepuesto;

  busqueda = '';
  pageSize = 30;
  page = 1;

  constructor(
    private articuloService: ArticuloService,
    private alertService: JhiAlertService,
    private modalService: NgbModal,
    private repuestosService: RepuestosService
  ) {}

  ngOnInit() {
    this.ordernarYFiltrarLista();
    this.totalArticulosPorMarca
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
    let articulos: Articulo[] = this.totalArticulosPorMarca.filter(articulo => articulo.tipoRepuesto.id === this.repuestoElegido.id);
    articulos.forEach(articulo => (articulo.valor = articulo.valor * (1 + porcentage / 100)));
    this.repuestosService.saveListaActualizada(articulos).subscribe((articulosRes: Articulo[]) => {
      articulos = articulosRes;
      this.ordernarYFiltrarLista();
    });
  }

  actualizarArticulo(articulo: Articulo) {
    this.repuestosService.actualizarRepuestoProveedor(articulo).subscribe((resArticulo: Articulo) => {
      this.totalArticulosPorMarca = this.totalArticulosPorMarca.filter(articuloEnLista => articuloEnLista.id !== articulo.id);
      this.totalArticulosPorMarca.push(resArticulo);
      this.ordernarYFiltrarLista();
      this.alertService.success('Se actualizó un artículo');
    });
  }

  cancelarArticulo(articulo: Articulo) {
    // llamo al back para fletarlo y lo saco de la lista
    this.articuloService.delete(articulo.id).subscribe(res => {
      this.totalArticulosPorMarca = this.totalArticulosPorMarca.filter(articuloEnLista => articuloEnLista.id !== articulo.id);
      this.ordernarYFiltrarLista();
      this.alertService.success('Se eliminó un artículo');
    });
  }

  agregarArticuloALista(articulo: Articulo) {
    this.totalArticulosPorMarca.push(articulo);
    this.ordernarYFiltrarLista();
  }

  ordernarYFiltrarLista() {
    this.totalArticulosPorMarca.sort((a, b) => (b.tipoRepuesto.nombreTipoRepuesto < a.tipoRepuesto.nombreTipoRepuesto ? 1 : -1));
    this.search();
  }

  search() {
    setTimeout(() => {
      const articulos = this.totalArticulosPorMarca.filter(articulo => {
        const term = this.busqueda.toLowerCase();
        return (
          articulo.codigoArticuloProveedor.toLowerCase().includes(term) ||
          articulo.tipoRepuesto.nombreTipoRepuesto.toLowerCase().includes(term) ||
          articulo.fechaCosto
            .toString()
            .toLowerCase()
            .includes(term)
        );
      });
      this.articulosPorMarca = articulos;
    }, 300);
  }
}
