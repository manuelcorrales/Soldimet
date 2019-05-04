package soldimet.constant;

import org.springframework.stereotype.Component;

@Component
public class Globales {

    //-----------------------SIMBOLO REEMPLAZAR---------------------
    public final String SIMBOLO_REEMPLAZAR = "%";

    //---------------------ESTADOS AGRUPADOS----------------------
    public final String  PEDIDOS_POSIBLES_DE_MOVIMIENTOS [] = {
        this.NOMBRE_ESTADO_PEDIDO_PEDIDO,
        this.NOMBRE_ESTADO_PEDIDO_PEDIDO_PARCIAL,
        this.NOMBRE_ESTADO_PEDIDO_RECIBIDO,
        this.NOMBRE_ESTADO_PEDIDO_RECIBIDO_PARCIAL
    };

    public final String  PRESUPUESTO_POSIBLE_CANCELAR [] = {
        this.NOMBRE_ESTADO_PRESUPUESTO_ACEPTADO,
        this.NOMBRE_ESTADO_PRESUPUESTO_CREADO,
        this.NOMBRE_ESTADO_PRESUPUESTO_CANCELADO
    };

    //-------------------------ESTADOS------------------------
    public final String NOMBRE_ESTADO_ARTICULO_ALTA = "Alta";
    public final String NOMBRE_ESTADO_COBRANZA_OPERACION_ALTA = "Alta";
    public final String NOMBRE_ESTADO_MOVIMIENTO_ALTA = "Alta";
    public final String NOMBRE_ESTADO_OPERACION_ALTA = "Alta";
    // public final String NOMBRE_ESTADO_PEDIDO_REPUESTO_ALTA = "Alta";
    public final String NOMBRE_ESTADO_PERSONA_ALTA = "Alta";
    public final String NOMBRE_ESTADO_PRESUPUESTO_ALTA = "Alta";
    public final String NOMBRE_ESTADO_COSTO_REPUESTO_PEDIDO = "Pedido";
    public final String NOMBRE_ESTADO_COSTO_REPUESTO_RECIBIDO = "Recibido";
    public final String NOMBRE_ESTADO_COSTO_REPUESTO_DEVUELTO = "Devuelto";

    public final String NOMBRE_ESTADO_ARTICULO_BAJA = "Baja";
    public final String NOMBRE_ESTADO_COBRANZA_OPERACION_BAJA = "Baja";
    public final String NOMBRE_ESTADO_MOVIMIENTO_BAJA = "Baja";
    public final String NOMBRE_ESTADO_OPERACION_BAJA = "Baja";
    public final String NOMBRE_ESTADO_PEDIDO_REPUESTO_BAJA = "Baja";
    public final String NOMBRE_ESTADO_PERSONA_BAJA = "Baja";
    public final String NOMBRE_ESTADO_PRESUPUESTO_BAJA = "Baja";

    public final String NOMBRE_ESTADO_PRESUPUESTO_ACEPTADO = "Aceptado";
    public final String NOMBRE_ESTADO_PRESUPUESTO_CREADO = "Creado";
    public final String NOMBRE_ESTADO_PRESUPUESTO_ENTREGADO = "Entregado";
    public final String NOMBRE_ESTADO_PRESUPUESTO_CANCELADO = "Cancelado";
    public final String NOMBRE_ESTADO_PRESUPUESTO_TERMINADO = "Terminado";

    public final String NOMBRE_ESTADO_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO = "Pendiente de pedido";
    public final String NOMBRE_ESTADO_PEDIDO_PEDIDO = "Pedido";
    public final String NOMBRE_ESTADO_PEDIDO_PEDIDO_PARCIAL = "Pedido Parcial";
    public final String NOMBRE_ESTADO_PEDIDO_RECIBIDO = "Recibido";
    public final String NOMBRE_ESTADO_PEDIDO_RECIBIDO_PARCIAL = "Recibido Parcial";
    public final String NOMBRE_ESTADO_PEDIDO_CANCELADO = "Cancelado";

    public final String NOMBRE_ESTADO_DETALLE_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO = "Pendiente de pedido";
    public final String NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO = "Pedido";
    public final String NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO = "Recibido";
    public final String NOMBRE_ESTADO_DETALLE_PEDIDO_CANCELADO = "Cancelado";

    public final String NOMBRE_ESTADO_COBRANZA_OPERACION_CREADO = "Creado";

    //---------------------------------Tipo Articulos------------------------
    public final String nombre_Tipo_Repuesto_Repuesto = "Repuesto";

    //---------------------------------Tipo Movimientos------------------------
    public final String nombre_Tipo_Movimiento_Ingreso = "Ingreso";
    public final String nombre_Tipo_Movimiento_Egreso = "Egreso";

    //---------------------------------Tipo Detalles------------------------
    public static final String nombre_Tipo_Detalle_Articulo = "Articulo";
    public static final String nombre_Tipo_Detalle_Proveedor = "Proveedor";
    public static final String nombre_Tipo_Detalle_Presupuesto = "Presupuesto";
    //----------------------------Nombre proveedor----------------------
    public final String PAZZAGLIA = "PAZZAGLIA S.A.";

    //----------------------------Nombre proveedor----------------------
    public final String NOMBRE_FORMA_DE_PAGO_EFECTIVO = "Efectivo";
    public final String NOMBRE_FORMA_DE_PAGO_TARJETA = "Tarjega";
    public final String NOMBRE_FORMA_DE_PAGO_CHEQUE = "Cheque";


    //--------------------MENSAJES CAJA-------------------------
    public final String MENSAJE_CAJA_AUN_CERRADA = "La caja hoy no se ha abierto.";
    public final String MENSAJE_CAJA_CERRADA = "La caja cerrada.";
    public final String MENSAJE_CAJA_YA_CERRADA = "La caja hoy ya se encuentra cerrada.";
    public final String MENSAJE_CAJA_YA_ABIERTA = "La caja ya se encuentra abierta.";
    public final String MENSAJE_CAJA_CERRADA_SIN_MOVIMIENTOS = "La caja se encuentra cerrada. No puede realizar movimientos.";
    public final String MENSAJE_CAJA_CERRADA_VOLVER_A_ABRIR = "La caja se abrio el día de hoy a las % y se cerro a las %. Desea volverla a abrir?";

    //------------------------MENSAJES PEDIDO REPUESTO--------------------

    public final String NO_HAY_PROVEEDORES_DADOS_DE_ALTA ="No se encontraron proveedores dados de Alta.";
}
