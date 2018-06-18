import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SoldimetAplicacionModule } from './aplicacion/aplicacion.module';
import { SoldimetArticuloModule } from './articulo/articulo.module';
import { SoldimetBancoModule } from './banco/banco.module';
import { SoldimetCajaModule } from './caja/caja.module';
import { SoldimetSubCategoriaModule } from './sub-categoria/sub-categoria.module';
import { SoldimetCategoriaPagoModule } from './categoria-pago/categoria-pago.module';
import { SoldimetCilindradaModule } from './cilindrada/cilindrada.module';
import { SoldimetClienteModule } from './cliente/cliente.module';
import { SoldimetCostoOperacionModule } from './costo-operacion/costo-operacion.module';
import { SoldimetDetallePedidoModule } from './detalle-pedido/detalle-pedido.module';
import { SoldimetDetallePresupuestoModule } from './detalle-presupuesto/detalle-presupuesto.module';
import { SoldimetDireccionModule } from './direccion/direccion.module';
import { SoldimetEmpleadoModule } from './empleado/empleado.module';
import { SoldimetEstadoArticuloModule } from './estado-articulo/estado-articulo.module';
import { SoldimetEstadoCobranzaOperacionModule } from './estado-cobranza-operacion/estado-cobranza-operacion.module';
import { SoldimetEstadoDetallePedidoModule } from './estado-detalle-pedido/estado-detalle-pedido.module';
import { SoldimetEstadoMovimientoModule } from './estado-movimiento/estado-movimiento.module';
import { SoldimetEstadoOperacionModule } from './estado-operacion/estado-operacion.module';
import { SoldimetEstadoPedidoRepuestoModule } from './estado-pedido-repuesto/estado-pedido-repuesto.module';
import { SoldimetEstadoPersonaModule } from './estado-persona/estado-persona.module';
import { SoldimetEstadoPresupuestoModule } from './estado-presupuesto/estado-presupuesto.module';
import { SoldimetFormaDePagoModule } from './forma-de-pago/forma-de-pago.module';
import { SoldimetHistorialPrecioModule } from './historial-precio/historial-precio.module';
import { SoldimetListaPrecioDesdeHastaModule } from './lista-precio-desde-hasta/lista-precio-desde-hasta.module';
import { SoldimetListaPrecioRectificacionCRAMModule } from './lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.module';
import { SoldimetLocalidadModule } from './localidad/localidad.module';
import { SoldimetMarcaModule } from './marca/marca.module';
import { SoldimetMotorModule } from './motor/motor.module';
import { SoldimetMovimientoModule } from './movimiento/movimiento.module';
import { SoldimetOperacionModule } from './operacion/operacion.module';
import { SoldimetPagoChequeModule } from './pago-cheque/pago-cheque.module';
import { SoldimetPagoEfectivoModule } from './pago-efectivo/pago-efectivo.module';
import { SoldimetPagoTarjetaModule } from './pago-tarjeta/pago-tarjeta.module';
import { SoldimetPedidoRepuestoModule } from './pedido-repuesto/pedido-repuesto.module';
import { SoldimetPersonaModule } from './persona/persona.module';
import { SoldimetPrecioRepuestoModule } from './precio-repuesto/precio-repuesto.module';
import { SoldimetPresupuestoModule } from './presupuesto/presupuesto.module';
import { SoldimetProveedorModule } from './proveedor/proveedor.module';
import { SoldimetRubroModule } from './rubro/rubro.module';
import { SoldimetTarjetaModule } from './tarjeta/tarjeta.module';
import { SoldimetTipoDetalleMovimientoModule } from './tipo-detalle-movimiento/tipo-detalle-movimiento.module';
import { SoldimetTipoMovimientoModule } from './tipo-movimiento/tipo-movimiento.module';
import { SoldimetTipoParteMotorModule } from './tipo-parte-motor/tipo-parte-motor.module';
import { SoldimetTipoRepuestoModule } from './tipo-repuesto/tipo-repuesto.module';
import { SoldimetTipoTarjetaModule } from './tipo-tarjeta/tipo-tarjeta.module';
import { SoldimetDetalleMovimientoModule } from './detalle-movimiento/detalle-movimiento.module';
import { SoldimetCobranzaOperacionModule } from './cobranza-operacion/cobranza-operacion.module';
import { SoldimetCobranzaRepuestoModule } from './cobranza-repuesto/cobranza-repuesto.module';
import { SoldimetCostoRepuestoModule } from './costo-repuesto/costo-repuesto.module';
import { SoldimetMovimientoArticuloModule } from './movimiento-articulo/movimiento-articulo.module';
import { SoldimetMovimientoPresupuestoModule } from './movimiento-presupuesto/movimiento-presupuesto.module';
import { SoldimetMovimientoPedidoModule } from './movimiento-pedido/movimiento-pedido.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SoldimetAplicacionModule,
        SoldimetArticuloModule,
        SoldimetBancoModule,
        SoldimetCajaModule,
        SoldimetSubCategoriaModule,
        SoldimetCategoriaPagoModule,
        SoldimetCilindradaModule,
        SoldimetClienteModule,
        SoldimetCostoOperacionModule,
        SoldimetDetallePedidoModule,
        SoldimetDetallePresupuestoModule,
        SoldimetDireccionModule,
        SoldimetEmpleadoModule,
        SoldimetEstadoArticuloModule,
        SoldimetEstadoCobranzaOperacionModule,
        SoldimetEstadoDetallePedidoModule,
        SoldimetEstadoMovimientoModule,
        SoldimetEstadoOperacionModule,
        SoldimetEstadoPedidoRepuestoModule,
        SoldimetEstadoPersonaModule,
        SoldimetEstadoPresupuestoModule,
        SoldimetFormaDePagoModule,
        SoldimetHistorialPrecioModule,
        SoldimetListaPrecioDesdeHastaModule,
        SoldimetListaPrecioRectificacionCRAMModule,
        SoldimetLocalidadModule,
        SoldimetMarcaModule,
        SoldimetMotorModule,
        SoldimetMovimientoModule,
        SoldimetOperacionModule,
        SoldimetPagoChequeModule,
        SoldimetPagoEfectivoModule,
        SoldimetPagoTarjetaModule,
        SoldimetPedidoRepuestoModule,
        SoldimetPersonaModule,
        SoldimetPrecioRepuestoModule,
        SoldimetPresupuestoModule,
        SoldimetProveedorModule,
        SoldimetRubroModule,
        SoldimetTarjetaModule,
        SoldimetTipoDetalleMovimientoModule,
        SoldimetTipoMovimientoModule,
        SoldimetTipoParteMotorModule,
        SoldimetTipoRepuestoModule,
        SoldimetTipoTarjetaModule,
        SoldimetDetalleMovimientoModule,
        SoldimetCobranzaOperacionModule,
        SoldimetCobranzaRepuestoModule,
        SoldimetCostoRepuestoModule,
        SoldimetMovimientoArticuloModule,
        SoldimetMovimientoPresupuestoModule,
        SoldimetMovimientoPedidoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEntityModule {}
