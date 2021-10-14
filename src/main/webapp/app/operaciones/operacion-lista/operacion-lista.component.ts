import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { DTOListaPrecioManoDeObra } from 'app/dto/dto-operaciones/dto-lista-costo-operaciones';
import { OperacionListaPrecioComponent } from 'app/operaciones/operacion-lista/operacion-lista-precio.component';
import { OperacionesService } from 'app/operaciones/operaciones-services';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { CostoOperacion } from 'app/shared/model/costo-operacion.model';

interface Grupo {
  tipoParte?: ITipoParteMotor;
  cilindrada?: ICilindrada;
}

@Component({
  selector: 'jhi-operacion-lista',
  templateUrl: './operacion-lista.component.html',
  styles: [],
})
export class OperacionListaComponent implements OnInit {
  @Input()
  lista: DTOListaPrecioManoDeObra;
  @ViewChildren('costosOperaciones')
  children: QueryList<OperacionListaPrecioComponent>;

  listaGroup: CostoOperacion[][] = [];
  grupos: Grupo[] = [];

  constructor(private _operacionesService: OperacionesService, private jhiAlertService: JhiAlertService) {}

  ngOnInit() {
    this.agruparListaPorTipoParteMotorYCilindrada();
  }

  getListaOperaciones(): DTOListaPrecioManoDeObra {
    return this.lista;
  }

  modificarPorcentageLista(porcentage: number) {
    this.children.forEach(child => {
      child.modificarPrecio(porcentage);
    });
  }

  guardarLista() {
    this._operacionesService.saveListaActualizada(this.lista).subscribe(listaNueva => {
      this.lista = listaNueva;
      this.jhiAlertService.success('Se actualizó la lista número:' + listaNueva.numeroLista);
    });
  }

  agruparListaPorTipoParteMotorYCilindrada() {
    this.crearGrupos();
    this.lista.operaciones.forEach((costoOperacion: CostoOperacion) => {
      const index = this.grupos.findIndex(
        grupo => grupo.tipoParte.id === costoOperacion.tipoParteMotor.id && grupo.cilindrada.id === costoOperacion.cilindrada.id
      );
      if (this.listaGroup[index]) {
        this.listaGroup[index].push(costoOperacion);
      } else {
        this.listaGroup[index] = [costoOperacion];
      }
    });
    this.listaGroup.forEach(lista => lista.sort(this._sortOperaciones));
  }

  crearGrupos() {
    this.lista.operaciones.forEach((costoOperacion: CostoOperacion) => {
      if (
        this.grupos.findIndex(
          grupo => grupo.tipoParte.id === costoOperacion.tipoParteMotor.id && grupo.cilindrada.id === costoOperacion.cilindrada.id
        ) === -1
      ) {
        this.grupos.push({
          tipoParte: costoOperacion.tipoParteMotor,
          cilindrada: costoOperacion.cilindrada,
        });
      }
    });
    this.grupos.sort(this._sortGrupos);
  }

  _sortGrupos(a: Grupo, b: Grupo) {
    if (a.tipoParte.nombreTipoParteMotor === 'Block') {
      return 1;
    }
    if (a.cilindrada.cantidadDeCilindros < b.cilindrada.cantidadDeCilindros) {
      return -1;
    }
    if (a.cilindrada.cantidadDeCilindros > b.cilindrada.cantidadDeCilindros) {
      return 1;
    }
    return 0;
  }

  _sortOperaciones(a: CostoOperacion, b: CostoOperacion) {
    if (a.operacion.nombreOperacion > b.operacion.nombreOperacion) {
      return 1;
    }
    if (a.operacion.nombreOperacion < b.operacion.nombreOperacion) {
      return -1;
    }
    return 0;
  }
}
