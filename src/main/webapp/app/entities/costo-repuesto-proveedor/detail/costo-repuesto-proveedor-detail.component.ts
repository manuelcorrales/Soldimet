import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICostoRepuestoProveedor } from '../costo-repuesto-proveedor.model';

@Component({
  selector: 'jhi-costo-repuesto-proveedor-detail',
  templateUrl: './costo-repuesto-proveedor-detail.component.html',
})
export class CostoRepuestoProveedorDetailComponent implements OnInit {
  costoRepuestoProveedor: ICostoRepuestoProveedor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ costoRepuestoProveedor }) => {
      this.costoRepuestoProveedor = costoRepuestoProveedor;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
