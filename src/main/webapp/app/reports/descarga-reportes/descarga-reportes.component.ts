import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from '../reportes.service';
import { saveAs } from 'file-saver';
import { JhiAlertService } from 'ng-jhipster';
import { Sucursal, ISucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from 'app/entities/sucursal';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-descarga-reportes',
  templateUrl: './descarga-reportes.component.html',
  styleUrls: ['./descarga-reportes.component.scss'],
})
export class DescargaReportesComponent implements OnInit {
  sucursales: Sucursal[] = [];
  imprimiendo = false;

  formGroup: FormGroup;

  constructor(
    private reporteService: ReportesService,
    private jhiAlertService: JhiAlertService,
    private sucursalService: SucursalService
  ) {}

  ngOnInit() {
    this.sucursalService.query().subscribe((res: HttpResponse<ISucursal[]>) => {
      this.sucursales = res.body;
    });
    this.formGroup = new FormGroup({
      Reporte: new FormControl('', [Validators.required]),
      Sucursal: new FormControl('', [Validators.required]),
      FechaDesde: new FormControl('', [Validators.required]),
      FechaHasta: new FormControl('', [Validators.required]),
    });
  }

  generarReporte() {
    this.imprimiendo = true;
    const desde = this.formatDate(this.formGroup.value['FechaDesde']);
    const hasta = this.formatDate(this.formGroup.value['FechaHasta']);
    const sucursal: Sucursal = this.formGroup.value['Sucursal'];
    this.reporteService.imprimirReporteRepuestos(desde, hasta, sucursal.id).subscribe(
      (file: Blob) => {
        saveAs(file, `Listado repuestos.xlsx`);
        this.imprimiendo = false;
      },
      error => {
        this.jhiAlertService.error(error.message);
        this.imprimiendo = false;
      }
    );
  }

  formatDate(date: any) {
    return date.format(date._f);
  }
}
