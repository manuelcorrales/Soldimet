import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { RepuestosService } from 'app/repuestos/repuestos-services';
import { Articulo } from 'app/shared/model/articulo.model';
import { Marca } from 'app/shared/model/marca.model';
import { ArticuloService } from 'app/entities/articulo';
import { JhiAlertService } from 'ng-jhipster';
import { MarcaService } from 'app/entities/marca';

@Component({
  selector: 'jhi-repuestos',
  templateUrl: './repuestos.component.html',
  styles: []
})
export class RepuestosComponent implements OnInit {
  @ViewChild('toastr', { static: false })
  toastrContainer: ViewContainerRef;

  marcas: Marca[] = [];
  articulosPorMarca: { marca: Marca; articulos: Articulo[] }[] = [];

  isCambiandoPorcentage = false;
  // copiaArticulosPorMarca: { marca: Marca; articulos: Articulo[] }[] = [];  // Copia para poder editar todos los valores juntos
  constructor(
    private repuestosService: RepuestosService,
    private articuloService: ArticuloService,
    private marcaService: MarcaService,
    private alertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.marcaService.query().subscribe(marcas => {
      this.marcas = marcas.body;
      this.repuestosService.getArticulos().subscribe(articulos => {
        this.marcas.forEach(marca => {
          const articuloMarca = { marca, articulos: articulos.filter(articulo => articulo.marca.id === marca.id) };
          this.articulosPorMarca.push(articuloMarca);
          this.ordernarLista(marca);
        });
        // this.copiaArticulosPorMarca = JSON.parse(JSON.stringify(this.articulosPorMarca));
      });
    });
  }

  volverProcentage(marca: Marca) {
    this.isCambiandoPorcentage = true;
    // this.articulosPorMarca = JSON.parse(JSON.stringify(this.copiaArticulosPorMarca));
  }

  modificarPorcentageLista(marca: Marca, porcentage: number) {
    this.isCambiandoPorcentage = true;
    // this.articulosPorMarca = JSON.parse(JSON.stringify(this.copiaArticulosPorMarca));
    this.articulosPorMarca
      .filter(grupo => grupo.marca.id === marca.id)[0]
      .articulos.forEach(articulo => (articulo.valor = articulo.valor * (1 + porcentage / 100)));
  }

  guardarLista(marca: Marca) {
    this.isCambiandoPorcentage = false;
    const grupo = this.articulosPorMarca.filter(grupoEnLista => grupoEnLista.marca.id === marca.id)[0];
    this.repuestosService.saveListaActualizada(grupo.articulos).subscribe((articulosRes: Articulo[]) => {
      grupo.articulos = articulosRes;
      this.ordernarLista(grupo.marca);
    });
  }

  actualizarArticulo(articulo: Articulo) {
    this.repuestosService.actualizarRepuestoProveedor(articulo).subscribe((resArticulo: Articulo) => {
      const grupo = this.articulosPorMarca.filter(grupos => grupos.marca.id === articulo.marca.id)[0];
      grupo.articulos = grupo.articulos.filter(articuloEnLista => articuloEnLista.id !== articulo.id);
      grupo.articulos.push(resArticulo);
      this.ordernarLista(grupo.marca);
      this.alertService.success('Se actualizó un artículo');
    });
  }

  cancelarArticulo(articulo: Articulo) {
    // llamo la back para fletarlo y lo saco de la lista
    this.articuloService.delete(articulo.id).subscribe(res => {
      const grupo = this.articulosPorMarca.filter(grupos => grupos.marca.id === articulo.marca.id)[0];
      grupo.articulos = grupo.articulos.filter(articuloEnLista => articuloEnLista.id !== articulo.id);
      this.ordernarLista(articulo.marca);
      this.alertService.success('Se eliminó un artículo');
    });
  }

  agregarArticuloALista(articulo: Articulo) {
    this.articulosPorMarca.filter(grupo => grupo.marca.id === articulo.marca.id)[0].articulos.push(articulo);
    this.ordernarLista(articulo.marca);
  }

  ordernarLista(marca: Marca) {
    this.articulosPorMarca
      .filter(grupo => grupo.marca.id === marca.id)[0]
      .articulos.sort((a, b) => (b.tipoRepuesto.nombreTipoRepuesto < a.tipoRepuesto.nombreTipoRepuesto ? 1 : -1));
  }
}
