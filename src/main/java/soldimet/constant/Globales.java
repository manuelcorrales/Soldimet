package soldimet.constant;

import org.springframework.stereotype.Component;

@Component
public class Globales {

    //-----------------------SIMBOLO REEMPLAZAR---------------------
    public final String SIMBOLO_REEMPLAZAR = "%";

    //-------------------------ESTADOS------------------------
    public final String NOMBRE_ESTADO_ARTICULO_ALTA = "Alta";
    public final String NOMBRE_ESTADO_COBRANZA_OPERACION_ALTA = "Alta";
    public final String NOMBRE_ESTADO_MOVIMIENTO_ALTA = "Alta";
    public final String NOMBRE_ESTADO_OPERACION_ALTA = "Alta";
    public final String NOMBRE_ESTADO_PEDIDO_REPUESTO_ALTA = "Alta";
    public final String NOMBRE_ESTADO_PERSONA_ALTA = "Alta";
    public final String NOMBRE_ESTADO_PRESUPUESTO_ALTA = "Alta";

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
    public final String NOMBRE_ESTADO_PEDIDO_PENDIENTE_RECIBO = "Pendiente de Recibo";
    public final String NOMBRE_ESTADO_PEDIDO_RECIBIDO = "Recibido";
    public final String NOMBRE_ESTADO_PEDIDO_CANCELADO = "Cancelado";

    public final String NOMBRE_ESTADO_DETALLE_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO = "Pendiente de pedido";
    public final String NOMBRE_ESTADO_DETALLE_PEDIDO_PENDIENTE_RECIBO = "Pendido";
    public final String NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO = "Recibido";
    public final String NOMBRE_ESTADO_DETALLE_PEDIDO_CANCELADO = "Cancelado";

    public final String NOMBRE_ESTADO_COBRANZA_OPERACION_CREADO = "Creado";

    //---------------------------------Tipo Articulos------------------------
    public final String nombre_Tipo_Repuesto_Repuesto = "Repuesto";
    //----------------------------Nombre proveedor----------------------

    public final String PAZZAGLIA = "PAZZAGLIA S.A.";


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
