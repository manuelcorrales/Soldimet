import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';

@Component({
  selector: 'jhi-costo-repuesto-proveedor-detail',
  templateUrl: './costo-repuesto-proveedor-detail.component.html'
})
export class CostoRepuestoProveedorDetailComponent implements OnInit {
  costoRepuestoProveedor: ICostoRepuestoProveedor;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ costoRepuestoProveedor }) => {
      this.costoRepuestoProveedor = costoRepuestoProveedor;
    });
  }

  previousState() {
    window.history.back();
  }
}
