import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'aplicacion',
        loadChildren: () => import('app/entities/aplicacion/aplicacion.module').then(m => m.SoldimetAplicacionModule)
      },
      {
        path: 'articulo',
        loadChildren: () => import('app/entities/articulo/articulo.module').then(m => m.SoldimetArticuloModule)
      },
      {
        path: 'banco',
        loadChildren: () => import('app/entities/banco/banco.module').then(m => m.SoldimetBancoModule)
      },
      {
        path: 'caja',
        loadChildren: () => import('app/entities/caja/caja.module').then(m => m.SoldimetCajaModule)
      },
      {
        path: 'sub-categoria',
        loadChildren: () => import('app/entities/sub-categoria/sub-categoria.module').then(m => m.SoldimetSubCategoriaModule)
      },
      {
        path: 'categoria-pago',
        loadChildren: () => import('app/entities/categoria-pago/categoria-pago.module').then(m => m.SoldimetCategoriaPagoModule)
      },
      {
        path: 'cilindrada',
        loadChildren: () => import('app/entities/cilindrada/cilindrada.module').then(m => m.SoldimetCilindradaModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('app/entities/cliente/cliente.module').then(m => m.SoldimetClienteModule)
      },
      {
        path: 'costo-operacion',
        loadChildren: () => import('app/entities/costo-operacion/costo-operacion.module').then(m => m.SoldimetCostoOperacionModule)
      },
      {
        path: 'detalle-pedido',
        loadChildren: () => import('app/entities/detalle-pedido/detalle-pedido.module').then(m => m.SoldimetDetallePedidoModule)
      },
      {
        path: 'detalle-presupuesto',
        loadChildren: () =>
          import('app/entities/detalle-presupuesto/detalle-presupuesto.module').then(m => m.SoldimetDetallePresupuestoModule)
      },
      {
        path: 'direccion',
        loadChildren: () => import('app/entities/direccion/direccion.module').then(m => m.SoldimetDireccionModule)
      },
      {
        path: 'empleado',
        loadChildren: () => import('app/entities/empleado/empleado.module').then(m => m.SoldimetEmpleadoModule)
      },
      {
        path: 'estado-articulo',
        loadChildren: () => import('app/entities/estado-articulo/estado-articulo.module').then(m => m.SoldimetEstadoArticuloModule)
      },
      {
        path: 'estado-cobranza-operacion',
        loadChildren: () =>
          import('app/entities/estado-cobranza-operacion/estado-cobranza-operacion.module').then(
            m => m.SoldimetEstadoCobranzaOperacionModule
          )
      },
      {
        path: 'estado-detalle-pedido',
        loadChildren: () =>
          import('app/entities/estado-detalle-pedido/estado-detalle-pedido.module').then(m => m.SoldimetEstadoDetallePedidoModule)
      },
      {
        path: 'estado-movimiento',
        loadChildren: () => import('app/entities/estado-movimiento/estado-movimiento.module').then(m => m.SoldimetEstadoMovimientoModule)
      },
      {
        path: 'estado-operacion',
        loadChildren: () => import('app/entities/estado-operacion/estado-operacion.module').then(m => m.SoldimetEstadoOperacionModule)
      },
      {
        path: 'estado-pedido-repuesto',
        loadChildren: () =>
          import('app/entities/estado-pedido-repuesto/estado-pedido-repuesto.module').then(m => m.SoldimetEstadoPedidoRepuestoModule)
      },
      {
        path: 'estado-persona',
        loadChildren: () => import('app/entities/estado-persona/estado-persona.module').then(m => m.SoldimetEstadoPersonaModule)
      },
      {
        path: 'estado-presupuesto',
        loadChildren: () => import('app/entities/estado-presupuesto/estado-presupuesto.module').then(m => m.SoldimetEstadoPresupuestoModule)
      },
      {
        path: 'forma-de-pago',
        loadChildren: () => import('app/entities/forma-de-pago/forma-de-pago.module').then(m => m.SoldimetFormaDePagoModule)
      },
      {
        path: 'historial-precio',
        loadChildren: () => import('app/entities/historial-precio/historial-precio.module').then(m => m.SoldimetHistorialPrecioModule)
      },
      {
        path: 'lista-precio-desde-hasta',
        loadChildren: () =>
          import('app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.module').then(m => m.SoldimetListaPrecioDesdeHastaModule)
      },
      {
        path: 'lista-precio-rectificacion-cram',
        loadChildren: () =>
          import('app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.module').then(
            m => m.SoldimetListaPrecioRectificacionCRAMModule
          )
      },
      {
        path: 'localidad',
        loadChildren: () => import('app/entities/localidad/localidad.module').then(m => m.SoldimetLocalidadModule)
      },
      {
        path: 'marca',
        loadChildren: () => import('app/entities/marca/marca.module').then(m => m.SoldimetMarcaModule)
      },
      {
        path: 'motor',
        loadChildren: () => import('app/entities/motor/motor.module').then(m => m.SoldimetMotorModule)
      },
      {
        path: 'movimiento',
        loadChildren: () => import('app/entities/movimiento/movimiento.module').then(m => m.SoldimetMovimientoModule)
      },
      {
        path: 'operacion',
        loadChildren: () => import('app/entities/operacion/operacion.module').then(m => m.SoldimetOperacionModule)
      },
      {
        path: 'pago-cheque',
        loadChildren: () => import('app/entities/pago-cheque/pago-cheque.module').then(m => m.SoldimetPagoChequeModule)
      },
      {
        path: 'pago-efectivo',
        loadChildren: () => import('app/entities/pago-efectivo/pago-efectivo.module').then(m => m.SoldimetPagoEfectivoModule)
      },
      {
        path: 'pago-tarjeta',
        loadChildren: () => import('app/entities/pago-tarjeta/pago-tarjeta.module').then(m => m.SoldimetPagoTarjetaModule)
      },
      {
        path: 'pedido-repuesto',
        loadChildren: () => import('app/entities/pedido-repuesto/pedido-repuesto.module').then(m => m.SoldimetPedidoRepuestoModule)
      },
      {
        path: 'persona',
        loadChildren: () => import('app/entities/persona/persona.module').then(m => m.SoldimetPersonaModule)
      },
      {
        path: 'precio-repuesto',
        loadChildren: () => import('app/entities/precio-repuesto/precio-repuesto.module').then(m => m.SoldimetPrecioRepuestoModule)
      },
      {
        path: 'presupuesto',
        loadChildren: () => import('app/entities/presupuesto/presupuesto.module').then(m => m.SoldimetPresupuestoModule)
      },
      {
        path: 'proveedor',
        loadChildren: () => import('app/entities/proveedor/proveedor.module').then(m => m.SoldimetProveedorModule)
      },
      {
        path: 'rubro',
        loadChildren: () => import('app/entities/rubro/rubro.module').then(m => m.SoldimetRubroModule)
      },
      {
        path: 'tipo-detalle-movimiento',
        loadChildren: () =>
          import('app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.module').then(m => m.SoldimetTipoDetalleMovimientoModule)
      },
      {
        path: 'tipo-movimiento',
        loadChildren: () => import('app/entities/tipo-movimiento/tipo-movimiento.module').then(m => m.SoldimetTipoMovimientoModule)
      },
      {
        path: 'tipo-parte-motor',
        loadChildren: () => import('app/entities/tipo-parte-motor/tipo-parte-motor.module').then(m => m.SoldimetTipoParteMotorModule)
      },
      {
        path: 'tipo-repuesto',
        loadChildren: () => import('app/entities/tipo-repuesto/tipo-repuesto.module').then(m => m.SoldimetTipoRepuestoModule)
      },
      {
        path: 'detalle-movimiento',
        loadChildren: () => import('app/entities/detalle-movimiento/detalle-movimiento.module').then(m => m.SoldimetDetalleMovimientoModule)
      },
      {
        path: 'cobranza-operacion',
        loadChildren: () => import('app/entities/cobranza-operacion/cobranza-operacion.module').then(m => m.SoldimetCobranzaOperacionModule)
      },
      {
        path: 'cobranza-repuesto',
        loadChildren: () => import('app/entities/cobranza-repuesto/cobranza-repuesto.module').then(m => m.SoldimetCobranzaRepuestoModule)
      },
      {
        path: 'costo-repuesto',
        loadChildren: () => import('app/entities/costo-repuesto/costo-repuesto.module').then(m => m.SoldimetCostoRepuestoModule)
      },
      {
        path: 'movimiento-articulo',
        loadChildren: () =>
          import('app/entities/movimiento-articulo/movimiento-articulo.module').then(m => m.SoldimetMovimientoArticuloModule)
      },
      {
        path: 'movimiento-presupuesto',
        loadChildren: () =>
          import('app/entities/movimiento-presupuesto/movimiento-presupuesto.module').then(m => m.SoldimetMovimientoPresupuestoModule)
      },
      {
        path: 'movimiento-pedido',
        loadChildren: () => import('app/entities/movimiento-pedido/movimiento-pedido.module').then(m => m.SoldimetMovimientoPedidoModule)
      },
      {
        path: 'estado-costo-repuesto',
        loadChildren: () =>
          import('app/entities/estado-costo-repuesto/estado-costo-repuesto.module').then(m => m.SoldimetEstadoCostoRepuestoModule)
      },
      {
        path: 'documentation-type',
        loadChildren: () => import('app/entities/documentation-type/documentation-type.module').then(m => m.SoldimetDocumentationTypeModule)
      },
      {
        path: 'sucursal',
        loadChildren: () => import('app/entities/sucursal/sucursal.module').then(m => m.SoldimetSucursalModule)
      },
      {
        path: 'medio-de-pago',
        loadChildren: () => import('app/entities/medio-de-pago/medio-de-pago.module').then(m => m.SoldimetMedioDePagoModule)
      },
      {
        path: 'medio-de-pago-cheque',
        loadChildren: () =>
          import('app/entities/medio-de-pago-cheque/medio-de-pago-cheque.module').then(m => m.SoldimetMedioDePagoChequeModule)
      },
      {
        path: 'costo-repuesto-proveedor',
        loadChildren: () =>
          import('./costo-repuesto-proveedor/costo-repuesto-proveedor.module').then(m => m.SoldimetCostoRepuestoProveedorModule)
      },
      {
        path: 'medida-articulo',
        loadChildren: () => import('./medida-articulo/medida-articulo.module').then(m => m.SoldimetMedidaArticuloModule)
      },
      {
        path: 'stock-articulo',
        loadChildren: () => import('./stock-articulo/stock-articulo.module').then(m => m.SoldimetStockArticuloModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: []
})
export class SoldimetEntityModule {}
