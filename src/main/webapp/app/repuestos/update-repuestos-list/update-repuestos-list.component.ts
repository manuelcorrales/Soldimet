import { Component, Input } from '@angular/core';
import { Marca } from 'app/shared/model/marca.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoRepuesto } from '../../shared/model/tipo-repuesto.model';

@Component({
  selector: 'jhi-update-repuestos-list',
  templateUrl: './update-repuestos-list.component.html',
  styleUrls: ['./update-repuestos-list.component.scss']
})
export class UpdateRepuestosListComponent {
  @Input() marca: Marca;
  @Input() porcentage: number;
  @Input() tipoRepuesto: TipoRepuesto;

  constructor(public activeModal: NgbActiveModal) {}
}
