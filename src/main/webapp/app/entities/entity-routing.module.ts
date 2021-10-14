import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'aplicacion',
        data: { pageTitle: 'Aplicacions' },
        loadChildren: () => import('./aplicacion/aplicacion.module').then(m => m.AplicacionModule),
      },
      {
        path: 'articulo',
        data: { pageTitle: 'Articulos' },
        loadChildren: () => import('./articulo/articulo.module').then(m => m.ArticuloModule),
      },
      {
        path: 'banco',
        data: { pageTitle: 'Bancos' },
        loadChildren: () => import('./banco/banco.module').then(m => m.BancoModule),
      },
      {
        path: 'caja',
        data: { pageTitle: 'Cajas' },
        loadChildren: () => import('./caja/caja.module').then(m => m.CajaModule),
      },
      {
        path: 'sub-categoria',
        data: { pageTitle: 'SubCategorias' },
        loadChildren: () => import('./sub-categoria/sub-categoria.module').then(m => m.SubCategoriaModule),
      },
      {
        path: 'categoria-pago',
        data: { pageTitle: 'CategoriaPagos' },
        loadChildren: () => import('./categoria-pago/categoria-pago.module').then(m => m.CategoriaPagoModule),
      },
      {
        path: 'cilindrada',
        data: { pageTitle: 'Cilindradas' },
        loadChildren: () => import('./cilindrada/cilindrada.module').then(m => m.CilindradaModule),
      },
      {
        path: 'cliente',
        data: { pageTitle: 'Clientes' },
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
      },
      {
        path: 'costo-operacion',
        data: { pageTitle: 'CostoOperacions' },
        loadChildren: () => import('./costo-operacion/costo-operacion.module').then(m => m.CostoOperacionModule),
      },
      {
        path: 'detalle-pedido',
        data: { pageTitle: 'DetallePedidos' },
        loadChildren: () => import('./detalle-pedido/detalle-pedido.module').then(m => m.DetallePedidoModule),
      },
      {
        path: 'detalle-presupuesto',
        data: { pageTitle: 'DetallePresupuestos' },
        loadChildren: () => import('./detalle-presupuesto/detalle-presupuesto.module').then(m => m.DetallePresupuestoModule),
      },
      {
        path: 'direccion',
        data: { pageTitle: 'Direccions' },
        loadChildren: () => import('./direccion/direccion.module').then(m => m.DireccionModule),
      },
      {
        path: 'empleado',
        data: { pageTitle: 'Empleados' },
        loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule),
      },
      {
        path: 'estado-articulo',
        data: { pageTitle: 'EstadoArticulos' },
        loadChildren: () => import('./estado-articulo/estado-articulo.module').then(m => m.EstadoArticuloModule),
      },
      {
        path: 'estado-cobranza-operacion',
        data: { pageTitle: 'EstadoCobranzaOperacions' },
        loadChildren: () =>
          import('./estado-cobranza-operacion/estado-cobranza-operacion.module').then(m => m.EstadoCobranzaOperacionModule),
      },
      {
        path: 'estado-detalle-pedido',
        data: { pageTitle: 'EstadoDetallePedidos' },
        loadChildren: () => import('./estado-detalle-pedido/estado-detalle-pedido.module').then(m => m.EstadoDetallePedidoModule),
      },
      {
        path: 'estado-movimiento',
        data: { pageTitle: 'EstadoMovimientos' },
        loadChildren: () => import('./estado-movimiento/estado-movimiento.module').then(m => m.EstadoMovimientoModule),
      },
      {
        path: 'estado-operacion',
        data: { pageTitle: 'EstadoOperacions' },
        loadChildren: () => import('./estado-operacion/estado-operacion.module').then(m => m.EstadoOperacionModule),
      },
      {
        path: 'estado-pedido-repuesto',
        data: { pageTitle: 'EstadoPedidoRepuestos' },
        loadChildren: () => import('./estado-pedido-repuesto/estado-pedido-repuesto.module').then(m => m.EstadoPedidoRepuestoModule),
      },
      {
        path: 'estado-persona',
        data: { pageTitle: 'EstadoPersonas' },
        loadChildren: () => import('./estado-persona/estado-persona.module').then(m => m.EstadoPersonaModule),
      },
      {
        path: 'estado-presupuesto',
        data: { pageTitle: 'EstadoPresupuestos' },
        loadChildren: () => import('./estado-presupuesto/estado-presupuesto.module').then(m => m.EstadoPresupuestoModule),
      },
      {
        path: 'forma-de-pago',
        data: { pageTitle: 'FormaDePagos' },
        loadChildren: () => import('./forma-de-pago/forma-de-pago.module').then(m => m.FormaDePagoModule),
      },
      {
        path: 'historial-precio',
        data: { pageTitle: 'HistorialPrecios' },
        loadChildren: () => import('./historial-precio/historial-precio.module').then(m => m.HistorialPrecioModule),
      },
      {
        path: 'lista-precio-desde-hasta',
        data: { pageTitle: 'ListaPrecioDesdeHastas' },
        loadChildren: () => import('./lista-precio-desde-hasta/lista-precio-desde-hasta.module').then(m => m.ListaPrecioDesdeHastaModule),
      },
      {
        path: 'lista-precio-rectificacion-cram',
        data: { pageTitle: 'ListaPrecioRectificacionCRAMS' },
        loadChildren: () =>
          import('./lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.module').then(
            m => m.ListaPrecioRectificacionCRAMModule
          ),
      },
      {
        path: 'localidad',
        data: { pageTitle: 'Localidads' },
        loadChildren: () => import('./localidad/localidad.module').then(m => m.LocalidadModule),
      },
      {
        path: 'marca',
        data: { pageTitle: 'Marcas' },
        loadChildren: () => import('./marca/marca.module').then(m => m.MarcaModule),
      },
      {
        path: 'motor',
        data: { pageTitle: 'Motors' },
        loadChildren: () => import('./motor/motor.module').then(m => m.MotorModule),
      },
      {
        path: 'movimiento',
        data: { pageTitle: 'Movimientos' },
        loadChildren: () => import('./movimiento/movimiento.module').then(m => m.MovimientoModule),
      },
      {
        path: 'operacion',
        data: { pageTitle: 'Operacions' },
        loadChildren: () => import('./operacion/operacion.module').then(m => m.OperacionModule),
      },
      {
        path: 'pago-cheque',
        data: { pageTitle: 'PagoCheques' },
        loadChildren: () => import('./pago-cheque/pago-cheque.module').then(m => m.PagoChequeModule),
      },
      {
        path: 'pago-efectivo',
        data: { pageTitle: 'PagoEfectivos' },
        loadChildren: () => import('./pago-efectivo/pago-efectivo.module').then(m => m.PagoEfectivoModule),
      },
      {
        path: 'pago-tarjeta',
        data: { pageTitle: 'PagoTarjetas' },
        loadChildren: () => import('./pago-tarjeta/pago-tarjeta.module').then(m => m.PagoTarjetaModule),
      },
      {
        path: 'pedido-repuesto',
        data: { pageTitle: 'PedidoRepuestos' },
        loadChildren: () => import('./pedido-repuesto/pedido-repuesto.module').then(m => m.PedidoRepuestoModule),
      },
      {
        path: 'persona',
        data: { pageTitle: 'Personas' },
        loadChildren: () => import('./persona/persona.module').then(m => m.PersonaModule),
      },
      {
        path: 'precio-repuesto',
        data: { pageTitle: 'PrecioRepuestos' },
        loadChildren: () => import('./precio-repuesto/precio-repuesto.module').then(m => m.PrecioRepuestoModule),
      },
      {
        path: 'presupuesto',
        data: { pageTitle: 'Presupuestos' },
        loadChildren: () => import('./presupuesto/presupuesto.module').then(m => m.PresupuestoModule),
      },
      {
        path: 'proveedor',
        data: { pageTitle: 'Proveedors' },
        loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorModule),
      },
      {
        path: 'rubro',
        data: { pageTitle: 'Rubros' },
        loadChildren: () => import('./rubro/rubro.module').then(m => m.RubroModule),
      },
      {
        path: 'tipo-detalle-movimiento',
        data: { pageTitle: 'TipoDetalleMovimientos' },
        loadChildren: () => import('./tipo-detalle-movimiento/tipo-detalle-movimiento.module').then(m => m.TipoDetalleMovimientoModule),
      },
      {
        path: 'tipo-movimiento',
        data: { pageTitle: 'TipoMovimientos' },
        loadChildren: () => import('./tipo-movimiento/tipo-movimiento.module').then(m => m.TipoMovimientoModule),
      },
      {
        path: 'tipo-parte-motor',
        data: { pageTitle: 'TipoParteMotors' },
        loadChildren: () => import('./tipo-parte-motor/tipo-parte-motor.module').then(m => m.TipoParteMotorModule),
      },
      {
        path: 'tipo-repuesto',
        data: { pageTitle: 'TipoRepuestos' },
        loadChildren: () => import('./tipo-repuesto/tipo-repuesto.module').then(m => m.TipoRepuestoModule),
      },
      {
        path: 'detalle-movimiento',
        data: { pageTitle: 'DetalleMovimientos' },
        loadChildren: () => import('./detalle-movimiento/detalle-movimiento.module').then(m => m.DetalleMovimientoModule),
      },
      {
        path: 'cobranza-operacion',
        data: { pageTitle: 'CobranzaOperacions' },
        loadChildren: () => import('./cobranza-operacion/cobranza-operacion.module').then(m => m.CobranzaOperacionModule),
      },
      {
        path: 'cobranza-repuesto',
        data: { pageTitle: 'CobranzaRepuestos' },
        loadChildren: () => import('./cobranza-repuesto/cobranza-repuesto.module').then(m => m.CobranzaRepuestoModule),
      },
      {
        path: 'costo-repuesto',
        data: { pageTitle: 'CostoRepuestos' },
        loadChildren: () => import('./costo-repuesto/costo-repuesto.module').then(m => m.CostoRepuestoModule),
      },
      {
        path: 'movimiento-articulo',
        data: { pageTitle: 'MovimientoArticulos' },
        loadChildren: () => import('./movimiento-articulo/movimiento-articulo.module').then(m => m.MovimientoArticuloModule),
      },
      {
        path: 'movimiento-presupuesto',
        data: { pageTitle: 'MovimientoPresupuestos' },
        loadChildren: () => import('./movimiento-presupuesto/movimiento-presupuesto.module').then(m => m.MovimientoPresupuestoModule),
      },
      {
        path: 'movimiento-pedido',
        data: { pageTitle: 'MovimientoPedidos' },
        loadChildren: () => import('./movimiento-pedido/movimiento-pedido.module').then(m => m.MovimientoPedidoModule),
      },
      {
        path: 'estado-costo-repuesto',
        data: { pageTitle: 'EstadoCostoRepuestos' },
        loadChildren: () => import('./estado-costo-repuesto/estado-costo-repuesto.module').then(m => m.EstadoCostoRepuestoModule),
      },
      {
        path: 'documentation-type',
        data: { pageTitle: 'DocumentationTypes' },
        loadChildren: () => import('./documentation-type/documentation-type.module').then(m => m.DocumentationTypeModule),
      },
      {
        path: 'sucursal',
        data: { pageTitle: 'Sucursals' },
        loadChildren: () => import('./sucursal/sucursal.module').then(m => m.SucursalModule),
      },
      {
        path: 'medio-de-pago',
        data: { pageTitle: 'MedioDePagos' },
        loadChildren: () => import('./medio-de-pago/medio-de-pago.module').then(m => m.MedioDePagoModule),
      },
      {
        path: 'medio-de-pago-tarjeta',
        data: { pageTitle: 'MedioDePagoTarjetas' },
        loadChildren: () => import('./medio-de-pago-tarjeta/medio-de-pago-tarjeta.module').then(m => m.MedioDePagoTarjetaModule),
      },
      {
        path: 'medio-de-pago-cheque',
        data: { pageTitle: 'MedioDePagoCheques' },
        loadChildren: () => import('./medio-de-pago-cheque/medio-de-pago-cheque.module').then(m => m.MedioDePagoChequeModule),
      },
      {
        path: 'costo-repuesto-proveedor',
        data: { pageTitle: 'CostoRepuestoProveedors' },
        loadChildren: () => import('./costo-repuesto-proveedor/costo-repuesto-proveedor.module').then(m => m.CostoRepuestoProveedorModule),
      },
      {
        path: 'medida-articulo',
        data: { pageTitle: 'MedidaArticulos' },
        loadChildren: () => import('./medida-articulo/medida-articulo.module').then(m => m.MedidaArticuloModule),
      },
      {
        path: 'detall-movimiento',
        data: { pageTitle: 'DetallMovimientos' },
        loadChildren: () => import('./detall-movimiento/detall-movimiento.module').then(m => m.DetallMovimientoModule),
      },
      {
        path: 'stock-articulo',
        data: { pageTitle: 'StockArticulos' },
        loadChildren: () => import('./stock-articulo/stock-articulo.module').then(m => m.StockArticuloModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
