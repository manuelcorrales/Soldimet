import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'aplicacion',
        loadChildren: () => import('./aplicacion/aplicacion.module').then(m => m.SoldimetAplicacionModule)
      },
      {
        path: 'articulo',
        loadChildren: () => import('./articulo/articulo.module').then(m => m.SoldimetArticuloModule)
      },
      {
        path: 'banco',
        loadChildren: () => import('./banco/banco.module').then(m => m.SoldimetBancoModule)
      },
      {
        path: 'caja',
        loadChildren: () => import('./caja/caja.module').then(m => m.SoldimetCajaModule)
      },
      {
        path: 'sub-categoria',
        loadChildren: () => import('./sub-categoria/sub-categoria.module').then(m => m.SoldimetSubCategoriaModule)
      },
      {
        path: 'categoria-pago',
        loadChildren: () => import('./categoria-pago/categoria-pago.module').then(m => m.SoldimetCategoriaPagoModule)
      },
      {
        path: 'cilindrada',
        loadChildren: () => import('./cilindrada/cilindrada.module').then(m => m.SoldimetCilindradaModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.SoldimetClienteModule)
      },
      {
        path: 'costo-operacion',
        loadChildren: () => import('./costo-operacion/costo-operacion.module').then(m => m.SoldimetCostoOperacionModule)
      },
      {
        path: 'detalle-pedido',
        loadChildren: () => import('./detalle-pedido/detalle-pedido.module').then(m => m.SoldimetDetallePedidoModule)
      },
      {
        path: 'detalle-presupuesto',
        loadChildren: () => import('./detalle-presupuesto/detalle-presupuesto.module').then(m => m.SoldimetDetallePresupuestoModule)
      },
      {
        path: 'direccion',
        loadChildren: () => import('./direccion/direccion.module').then(m => m.SoldimetDireccionModule)
      },
      {
        path: 'empleado',
        loadChildren: () => import('./empleado/empleado.module').then(m => m.SoldimetEmpleadoModule)
      },
      {
        path: 'estado-articulo',
        loadChildren: () => import('./estado-articulo/estado-articulo.module').then(m => m.SoldimetEstadoArticuloModule)
      },
      {
        path: 'estado-cobranza-operacion',
        loadChildren: () =>
          import('./estado-cobranza-operacion/estado-cobranza-operacion.module').then(m => m.SoldimetEstadoCobranzaOperacionModule)
      },
      {
        path: 'estado-detalle-pedido',
        loadChildren: () => import('./estado-detalle-pedido/estado-detalle-pedido.module').then(m => m.SoldimetEstadoDetallePedidoModule)
      },
      {
        path: 'estado-movimiento',
        loadChildren: () => import('./estado-movimiento/estado-movimiento.module').then(m => m.SoldimetEstadoMovimientoModule)
      },
      {
        path: 'estado-operacion',
        loadChildren: () => import('./estado-operacion/estado-operacion.module').then(m => m.SoldimetEstadoOperacionModule)
      },
      {
        path: 'estado-pedido-repuesto',
        loadChildren: () => import('./estado-pedido-repuesto/estado-pedido-repuesto.module').then(m => m.SoldimetEstadoPedidoRepuestoModule)
      },
      {
        path: 'estado-persona',
        loadChildren: () => import('./estado-persona/estado-persona.module').then(m => m.SoldimetEstadoPersonaModule)
      },
      {
        path: 'estado-presupuesto',
        loadChildren: () => import('./estado-presupuesto/estado-presupuesto.module').then(m => m.SoldimetEstadoPresupuestoModule)
      },
      {
        path: 'forma-de-pago',
        loadChildren: () => import('./forma-de-pago/forma-de-pago.module').then(m => m.SoldimetFormaDePagoModule)
      },
      {
        path: 'historial-precio',
        loadChildren: () => import('./historial-precio/historial-precio.module').then(m => m.SoldimetHistorialPrecioModule)
      },
      {
        path: 'lista-precio-desde-hasta',
        loadChildren: () =>
          import('./lista-precio-desde-hasta/lista-precio-desde-hasta.module').then(m => m.SoldimetListaPrecioDesdeHastaModule)
      },
      {
        path: 'lista-precio-rectificacion-cram',
        loadChildren: () =>
          import('./lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.module').then(
            m => m.SoldimetListaPrecioRectificacionCRAMModule
          )
      },
      {
        path: 'localidad',
        loadChildren: () => import('./localidad/localidad.module').then(m => m.SoldimetLocalidadModule)
      },
      {
        path: 'marca',
        loadChildren: () => import('./marca/marca.module').then(m => m.SoldimetMarcaModule)
      },
      {
        path: 'motor',
        loadChildren: () => import('./motor/motor.module').then(m => m.SoldimetMotorModule)
      },
      {
        path: 'movimiento',
        loadChildren: () => import('./movimiento/movimiento.module').then(m => m.SoldimetMovimientoModule)
      },
      {
        path: 'operacion',
        loadChildren: () => import('./operacion/operacion.module').then(m => m.SoldimetOperacionModule)
      },
      {
        path: 'pago-cheque',
        loadChildren: () => import('./pago-cheque/pago-cheque.module').then(m => m.SoldimetPagoChequeModule)
      },
      {
        path: 'pago-efectivo',
        loadChildren: () => import('./pago-efectivo/pago-efectivo.module').then(m => m.SoldimetPagoEfectivoModule)
      },
      {
        path: 'pago-tarjeta',
        loadChildren: () => import('./pago-tarjeta/pago-tarjeta.module').then(m => m.SoldimetPagoTarjetaModule)
      },
      {
        path: 'pedido-repuesto',
        loadChildren: () => import('./pedido-repuesto/pedido-repuesto.module').then(m => m.SoldimetPedidoRepuestoModule)
      },
      {
        path: 'persona',
        loadChildren: () => import('./persona/persona.module').then(m => m.SoldimetPersonaModule)
      },
      {
        path: 'precio-repuesto',
        loadChildren: () => import('./precio-repuesto/precio-repuesto.module').then(m => m.SoldimetPrecioRepuestoModule)
      },
      {
        path: 'presupuesto',
        loadChildren: () => import('./presupuesto/presupuesto.module').then(m => m.SoldimetPresupuestoModule)
      },
      {
        path: 'proveedor',
        loadChildren: () => import('./proveedor/proveedor.module').then(m => m.SoldimetProveedorModule)
      },
      {
        path: 'rubro',
        loadChildren: () => import('./rubro/rubro.module').then(m => m.SoldimetRubroModule)
      },
      {
        path: 'tarjeta',
        loadChildren: () => import('./tarjeta/tarjeta.module').then(m => m.SoldimetTarjetaModule)
      },
      {
        path: 'tipo-detalle-movimiento',
        loadChildren: () =>
          import('./tipo-detalle-movimiento/tipo-detalle-movimiento.module').then(m => m.SoldimetTipoDetalleMovimientoModule)
      },
      {
        path: 'tipo-movimiento',
        loadChildren: () => import('./tipo-movimiento/tipo-movimiento.module').then(m => m.SoldimetTipoMovimientoModule)
      },
      {
        path: 'tipo-parte-motor',
        loadChildren: () => import('./tipo-parte-motor/tipo-parte-motor.module').then(m => m.SoldimetTipoParteMotorModule)
      },
      {
        path: 'tipo-repuesto',
        loadChildren: () => import('./tipo-repuesto/tipo-repuesto.module').then(m => m.SoldimetTipoRepuestoModule)
      },
      {
        path: 'tipo-tarjeta',
        loadChildren: () => import('./tipo-tarjeta/tipo-tarjeta.module').then(m => m.SoldimetTipoTarjetaModule)
      },
      {
        path: 'detalle-movimiento',
        loadChildren: () => import('./detalle-movimiento/detalle-movimiento.module').then(m => m.SoldimetDetalleMovimientoModule)
      },
      {
        path: 'cobranza-operacion',
        loadChildren: () => import('./cobranza-operacion/cobranza-operacion.module').then(m => m.SoldimetCobranzaOperacionModule)
      },
      {
        path: 'cobranza-repuesto',
        loadChildren: () => import('./cobranza-repuesto/cobranza-repuesto.module').then(m => m.SoldimetCobranzaRepuestoModule)
      },
      {
        path: 'costo-repuesto',
        loadChildren: () => import('./costo-repuesto/costo-repuesto.module').then(m => m.SoldimetCostoRepuestoModule)
      },
      {
        path: 'movimiento-articulo',
        loadChildren: () => import('./movimiento-articulo/movimiento-articulo.module').then(m => m.SoldimetMovimientoArticuloModule)
      },
      {
        path: 'movimiento-presupuesto',
        loadChildren: () =>
          import('./movimiento-presupuesto/movimiento-presupuesto.module').then(m => m.SoldimetMovimientoPresupuestoModule)
      },
      {
        path: 'movimiento-pedido',
        loadChildren: () => import('./movimiento-pedido/movimiento-pedido.module').then(m => m.SoldimetMovimientoPedidoModule)
      },
      {
        path: 'estado-costo-repuesto',
        loadChildren: () => import('./estado-costo-repuesto/estado-costo-repuesto.module').then(m => m.SoldimetEstadoCostoRepuestoModule)
      },
      {
        path: 'documentation-type',
        loadChildren: () => import('./documentation-type/documentation-type.module').then(m => m.SoldimetDocumentationTypeModule)
      },
      {
        path: 'sucursal',
        loadChildren: () => import('./sucursal/sucursal.module').then(m => m.SoldimetSucursalModule)
      },
      {
        path: 'medio-de-pago',
        loadChildren: () => import('./medio-de-pago/medio-de-pago.module').then(m => m.SoldimetMedioDePagoModule)
      },
      {
        path: 'medio-de-pago-tarjeta',
        loadChildren: () => import('./medio-de-pago-tarjeta/medio-de-pago-tarjeta.module').then(m => m.SoldimetMedioDePagoTarjetaModule)
      },
      {
        path: 'medio-de-pago-cheque',
        loadChildren: () => import('./medio-de-pago-cheque/medio-de-pago-cheque.module').then(m => m.SoldimetMedioDePagoChequeModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: []
})
export class SoldimetEntityModule {}
