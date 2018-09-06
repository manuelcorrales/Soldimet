import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SoldimetAplicacionModule } from 'app/entities/aplicacion/aplicacion.module';
import { SoldimetArticuloModule } from 'app/entities/articulo/articulo.module';
import { SoldimetBancoModule } from 'app/entities/banco/banco.module';
import { SoldimetCajaModule } from 'app/entities/caja/caja.module';
import { SoldimetSubCategoriaModule } from 'app/entities/sub-categoria/sub-categoria.module';
import { SoldimetCategoriaPagoModule } from 'app/entities/categoria-pago/categoria-pago.module';
import { SoldimetCilindradaModule } from 'app/entities/cilindrada/cilindrada.module';
import { SoldimetClienteModule } from 'app/entities/cliente/cliente.module';
import { SoldimetCostoOperacionModule } from 'app/entities/costo-operacion/costo-operacion.module';
import { SoldimetDetallePedidoModule } from 'app/entities/detalle-pedido/detalle-pedido.module';
import { SoldimetDetallePresupuestoModule } from 'app/entities/detalle-presupuesto/detalle-presupuesto.module';
import { SoldimetDireccionModule } from 'app/entities/direccion/direccion.module';
import { SoldimetEmpleadoModule } from 'app/entities/empleado/empleado.module';
import { SoldimetEstadoArticuloModule } from 'app/entities/estado-articulo/estado-articulo.module';
import { SoldimetEstadoCobranzaOperacionModule } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion.module';
import { SoldimetEstadoDetallePedidoModule } from 'app/entities/estado-detalle-pedido/estado-detalle-pedido.module';
import { SoldimetEstadoMovimientoModule } from 'app/entities/estado-movimiento/estado-movimiento.module';
import { SoldimetEstadoOperacionModule } from 'app/entities/estado-operacion/estado-operacion.module';
import { SoldimetEstadoPedidoRepuestoModule } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.module';
import { SoldimetEstadoPersonaModule } from 'app/entities/estado-persona/estado-persona.module';
import { SoldimetEstadoPresupuestoModule } from 'app/entities/estado-presupuesto/estado-presupuesto.module';
import { SoldimetFormaDePagoModule } from 'app/entities/forma-de-pago/forma-de-pago.module';
import { SoldimetHistorialPrecioModule } from 'app/entities/historial-precio/historial-precio.module';
import { SoldimetListaPrecioDesdeHastaModule } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.module';
import { SoldimetListaPrecioRectificacionCRAMModule } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.module';
import { SoldimetLocalidadModule } from 'app/entities/localidad/localidad.module';
import { SoldimetMarcaModule } from 'app/entities/marca/marca.module';
import { SoldimetMotorModule } from 'app/entities/motor/motor.module';
import { SoldimetMovimientoModule } from 'app/entities/movimiento/movimiento.module';
import { SoldimetOperacionModule } from 'app/entities/operacion/operacion.module';
import { SoldimetPagoChequeModule } from 'app/entities/pago-cheque/pago-cheque.module';
import { SoldimetPagoEfectivoModule } from 'app/entities/pago-efectivo/pago-efectivo.module';
import { SoldimetPagoTarjetaModule } from 'app/entities/pago-tarjeta/pago-tarjeta.module';
import { SoldimetPedidoRepuestoModule } from 'app/entities/pedido-repuesto/pedido-repuesto.module';
import { SoldimetPersonaModule } from 'app/entities/persona/persona.module';
import { SoldimetPrecioRepuestoModule } from 'app/entities/precio-repuesto/precio-repuesto.module';
import { SoldimetPresupuestoModule } from 'app/entities/presupuesto/presupuesto.module';
import { SoldimetProveedorModule } from 'app/entities/proveedor/proveedor.module';
import { SoldimetRubroModule } from 'app/entities/rubro/rubro.module';
import { SoldimetTarjetaModule } from 'app/entities/tarjeta/tarjeta.module';
import { SoldimetTipoDetalleMovimientoModule } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.module';
import { SoldimetTipoMovimientoModule } from 'app/entities/tipo-movimiento/tipo-movimiento.module';
import { SoldimetTipoParteMotorModule } from 'app/entities/tipo-parte-motor/tipo-parte-motor.module';
import { SoldimetTipoRepuestoModule } from 'app/entities/tipo-repuesto/tipo-repuesto.module';
import { SoldimetTipoTarjetaModule } from 'app/entities/tipo-tarjeta/tipo-tarjeta.module';
import { SoldimetDetalleMovimientoModule } from 'app/entities/detalle-movimiento/detalle-movimiento.module';
import { SoldimetCobranzaOperacionModule } from 'app/entities/cobranza-operacion/cobranza-operacion.module';
import { SoldimetCobranzaRepuestoModule } from 'app/entities/cobranza-repuesto/cobranza-repuesto.module';
import { SoldimetCostoRepuestoModule } from 'app/entities/costo-repuesto/costo-repuesto.module';
import { SoldimetMovimientoArticuloModule } from 'app/entities/movimiento-articulo/movimiento-articulo.module';
import { SoldimetMovimientoPresupuestoModule } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto.module';
import { SoldimetMovimientoPedidoModule } from 'app/entities/movimiento-pedido/movimiento-pedido.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
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
