/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.print.PageFormat;
import java.awt.print.Paper;
import java.awt.print.Printable;
import java.awt.print.PrinterException;
import java.util.ArrayList;
import soldimet.domain.Cliente;
import soldimet.domain.Persona;
import soldimet.service.dto.DTOCabeceraImpresionPresupuesto;
import soldimet.service.dto.DTOCobroOperacionCUHacerPresupuesto;
import soldimet.service.dto.DTOImpresionCadena;
import soldimet.service.dto.DTOPresupuestoFinal;
import soldimet.service.dto.DtoRepuestosElegidos;

/**
 *
 * @author Manu
 */
public final class ExpertoImpresionPresupuesto implements Printable{

    public  ExpertoImpresionPresupuesto() {
        iniciarCU();
    }
    //contiene todos los graficos de la impresion
    Graphics2D g2d;

    //contienen las listas en su ubicacion correspondiente
    private final ArrayList<String> listaOperaciones = new ArrayList();
    private final ArrayList<String> listaRepuestos = new ArrayList();
    //guardo los elementos que no estan y los agrego al final de la impresion
    private final ArrayList<DTOImpresionCadena> listaImpresionAlFinal = new ArrayList();



    //tamaño oficio 21.59 x 34
    //tamaño A4 21 x 29,7
    private final double tamañoOficioX = 21.59;
    private final double tamañoOficioY= 34;
    private final double margenSuperior=7;
    private final double margenInferior=21;
    private final double margenIzquierdo= 17;
    private final double margenDerecho=31;

    /*
    NPresX:425pp
    NPresY:85pp
    */
    private final int NPresX =425;
    private final int NPresY = 85;


    /*
    CabeceraIZQ x:85pp
    CabeceraDer X:340pp
    Cabecera Y:96-97pp
    diferencia alturacabecera: 11-12p
    */
    private final int cabeceraIzqX =85;
    private final int cabeceraDerX = 340;
    private final int cabeceraY=96;
    private final int difCabecera=11;

    /*
    mano obra X:240pp
    mano obra Y:178pp
    diferencia altura cuerpo:15-16pp
    Repuestos X:456pp
    Repuestos Y:178pp
    */
    private final int manoObraX =240;
    private final int manoObraY =178;
    private final int diferenciaAlturaCuerpo =15;
    private final int repuestosX = 456;
    private final int repuestosY = 178;


    private final int totalManoObraY=(int) ((tamañoOficioY*72)-72);
    private final int totalRepuestosY=(int) ((tamañoOficioY*72)-72);
    private final int totalNETOY= (int) ((tamañoOficioY*72)-38);

    private final int agregadosAlFinalY = totalRepuestosY-(5*diferenciaAlturaCuerpo);
    private final int agregadosAlFinalX =297;

//CADA DATO A IMPRIMIR TIENE UN VALOR, UNA UBICACION Y UN NOMBRE


    @Override
    public int print(Graphics graphics, PageFormat pageFormat, int pageIndex) throws PrinterException {
        g2d = (Graphics2D) graphics;
        g2d.translate(pageFormat.getImageableX(), pageFormat.getImageableY());
        g2d.setFont(new Font("Monospaced", Font.BOLD, 12));
        Paper hoja = pageFormat.getPaper();
        pageFormat.setOrientation(PageFormat.PORTRAIT);
        hoja.setSize(tamañoOficioX*72, tamañoOficioY*72);
        hoja.setImageableArea(margenIzquierdo, margenSuperior,
                (tamañoOficioX*72)-margenDerecho, (tamañoOficioY*72)-margenInferior);
        return (PAGE_EXISTS);
    }



    private void iniciarCU(){
        //1 Rectificar Cilindros
    //2 Encamisar Cilindros
    //3 Dar Altura a Camisas
    //4 Bruñir Cilindros
    //5 Cepillar Case de Clock
    //6 Prueba Hidráulica Clock
    //7 Adaptar Retén
    //8 Ajustar Pernos a Bielas
    //9 Armar y Encuadrar Bielas
    //10 Rectificar Cigüeñal
    //11 Pulir Cigüeñal
    //12 Balancear Cigüeñal
    //13 Limpieza y Colocacion de Tapones
    //14 Probar Cigüeñal Magnaflux
    //15 Roscar Cigüeñal
    //16 Rectificar Pista Retén Cigüeñal
    //17 Alesar o Ajustar Coginete Bancada
    //18 Alesar, Presentar, Ajustar Cojinetes de Biela
    //19 Rectificar Arbol de Leva
    //20 Pulir Arbol de Leva
    //21 Alesar bujes de Leva
    //22 Alesar Bujes de Mando
    //23 Adaptar Bujes de Leva
    //24 Cepillar Tapa de Cilindros
    //25 Rectificar asiento de Válvulas
    //26 Cambiar Guías de Válvulas
    //27 Ajustar Vástago de Guías
    //28 Encasquillar Asientos de Válvulas
    //29 Rectificar Válvulas
    //30 Entubar Guías
    //31 Prueba Hidráulica de Tapa de Cilindro
    //32 Soldar Tapa de Cilindro
    //33 Lavado de Motor
    //34 Probrar Bomba de Aceite
    //35 Rectificar Volante
    //36 Dar Altura a Pistones
    //37 Proceso Tecnifier Cigüeñal

        //creo la lista de tareas o mano de obra en su posicion correspondiente
        listaOperaciones.add("Rectificar Cilindros");//1
        listaOperaciones.add("Encamisar Cilindros");//2
        listaOperaciones.add("Dar Altura a Camisas");//3
        listaOperaciones.add("Bruñir Cilindros");//4
        listaOperaciones.add("Cepillar Base de Block");//5
        listaOperaciones.add("Prueba Hidráulica Block");//6
        listaOperaciones.add("Adaptar Retén");//7
        listaOperaciones.add("Ajustar Pernos a Bielas");//8
        listaOperaciones.add("Armar y Encuadrar Bielas");//9
        listaOperaciones.add("Rectificar Cigüeñal");//10
        listaOperaciones.add("Pulir Cigüeñal");//11
        listaOperaciones.add("Balancear Cigüeñal");//12
        listaOperaciones.add("Limpieza y Colocacion de Tapones");//13
        listaOperaciones.add("Probar Cigüeñal Magnaflux");//14
        listaOperaciones.add("Roscar Cigüeñal");//15
        listaOperaciones.add("Rectificar Pista Retén Cigüeñal");//16
        listaOperaciones.add("Alesar o Ajustar Coginete Bancada");//17
        listaOperaciones.add("Alesar, Presentar, Ajustar Cojinetes de Biela");//18
        listaOperaciones.add("Rectificar Arbol de Leva");//19
        listaOperaciones.add("Pulir Arbol de Leva");//20
        listaOperaciones.add("Alesar bujes de Leva");//21
        listaOperaciones.add("Alesar Bujes de Mando");//22
        listaOperaciones.add("Adaptar Bujes de Leva");//23
        listaOperaciones.add("Cepillar Tapa de Cilindros");//24
        listaOperaciones.add("Rectificar asiento de Válvulas");//25
        listaOperaciones.add("Cambiar Guías de Válvulas");//26
        listaOperaciones.add("Ajustar Vástago de Guías");//27
        listaOperaciones.add("Encasquillar Asientos de Válvulas");//28
        listaOperaciones.add("Rectificar Válvulas");//29
        listaOperaciones.add("Entubar Guías");//30
        listaOperaciones.add("Prueba Hidráulica de Tapa de Cilindro");//31
        listaOperaciones.add("Soldar Tapa de Cilindro");//32
        listaOperaciones.add("Lavado de Motor");//33
        listaOperaciones.add("Probrar Bomba de Aceite");//34
        listaOperaciones.add("Rectificar Volante");//35
        listaOperaciones.add("Dar Altura a Pistones");//36


        //1 Conjunto Motor
    //2 Sub Conjunto
    //3 Camisas
    //4 Pistones
    //5 Pernos
    //6 Aros
    //7 Aros Compresor
    //8 Buje de Biela
    //9 Cojinete de Biela
    //10 Cojinete de Bancada
    //11 Cojinete Axial
    //12 Cojinete de Levas
    //13 Cojinete Eje Mando
    //14 Cojinete Compresor
    //15 Válvulas
    //16 Guías
    //17 Casquillo
    //18 Juego de Juntas
    //19 Junta Descarbonización
    //20 Tapones Block
    //21 Bomba de Aceite
    //22 Arbol de Leva
    //23 Block
    //24 Cigüeñal
    //25 Tapa de Cilindros
    //26 Botadores
    //27 Juego de Tornillos
    //28 Kit de Distribución
    //29 Kit de Retenes
    //30 Kit de Compresor
    //31 Kit de Embrague
    //32 Juego de Juntas Camisas
    //33 Retenes de guía de válvulas

        //creo la lista de repuestos
        listaRepuestos.add("Conjunto Motor");//1
        listaRepuestos.add("Sub Conjunto");//2
        listaRepuestos.add("Camisas");//3
        listaRepuestos.add("Pistones");//4
        listaRepuestos.add("Pernos");//5
        listaRepuestos.add("Aros");//6
        listaRepuestos.add("Aros Compresor");//7
        listaRepuestos.add("Buje de Bielas");//8
        listaRepuestos.add("Cojinetes de Bielas");//9
        listaRepuestos.add("Cojinetes de Bancada");//10
        listaRepuestos.add("Cojinetes Axiales");//11
        listaRepuestos.add("Cojinetes de Levas");//12
        listaRepuestos.add("Cojinetes Eje Mando");//13
        listaRepuestos.add("Cojinetes Compresor");//14
        listaRepuestos.add("Válvulas");//15
        listaRepuestos.add("Guías");//16
        listaRepuestos.add("Casquillos");//17
        listaRepuestos.add("Juego de Juntas");//18
        listaRepuestos.add("Junta Descarbonización");//19
        listaRepuestos.add("Tapones Block");//20
        listaRepuestos.add("Bomba de Aceite");//21
        listaRepuestos.add("Arbol de Leva");//22
        listaRepuestos.add("Block");//23
        listaRepuestos.add("Cigüeñal");//24
        listaRepuestos.add("Tapa de Cilindro");//25
        listaRepuestos.add("Botadores");//26
        listaRepuestos.add("Juego de Tornillos");//27
        listaRepuestos.add("Kit de Distribución");//28
        listaRepuestos.add("Kit de Retenes");//29
        listaRepuestos.add("Kit de Compresor");//30
        listaRepuestos.add("Kit de Embrague");//31
        listaRepuestos.add("Juego de Juntas Camisas");//32
        listaRepuestos.add("Retenes de guía de válvulas");//33

    }

    //Creo la hoja a imprimir

    private void crearHojaImpresionPresupuesto(ArrayList<DTOImpresionCadena> listaDatos, DTOCabeceraImpresionPresupuesto cabecera) {

        //Preparo los datos de la cabecera y los totales y las observaciones
        //dibujo cada una de las cadenas en una posicion
        g2d.drawString(cabecera.getCliente(), cabeceraIzqX, cabeceraY);//cliente
        g2d.drawString(cabecera.getDomicilio(), cabeceraIzqX, cabeceraY + (difCabecera * 1));//domicilio
        g2d.drawString(cabecera.getLocalidad(), cabeceraIzqX, cabeceraY + (difCabecera * 2));//localidad
        g2d.drawString(cabecera.getTelefono(), cabeceraIzqX, cabeceraY + (difCabecera * 3));//teléfono

        g2d.drawString(cabecera.getFecha(), cabeceraDerX, cabeceraY);//fecha
        g2d.drawString(cabecera.getMotor(), cabeceraDerX, cabeceraY + (difCabecera * 1));//motor
        g2d.drawString(cabecera.getFormaDePago(), cabeceraDerX, cabeceraY + (difCabecera * 2));//Forma de Pago

        g2d.drawString(cabecera.getNumeroPresupuesto(), NPresX, NPresY);//Numero presupuesto

        g2d.drawString(cabecera.getTotalManoObra(), manoObraX, totalManoObraY);//Total mano de obra
        g2d.drawString(cabecera.getTotalRepuestos(), repuestosX, totalRepuestosY);//Total repuestos
        g2d.drawString(cabecera.getTotalNeto(), repuestosX, totalNETOY);//Total Neto
        g2d.drawString(cabecera.getObservaciones(), 72, 100);//observaciones

        //preparo el cuerpo del presupuesto
        for (DTOImpresionCadena dto : listaDatos) {

            //busco la ubicacion en la lista
            int ubicacionEnLista = listaDatos.indexOf(dto) + 1;

            int ubicacionX;
            int ubicacionY;

            Boolean enListaOperaciones = false;
            Boolean enListaRepuesto = false;

            //reviso en que lista se encuentra para ubicarlo en una columna
            for (String operacion : listaOperaciones) {
                if (dto.getNombreCadena().contentEquals(operacion)) {
                    enListaOperaciones = true;
                }
            }

            for (String repuesto : listaRepuestos) {
                if (dto.getNombreCadena().contentEquals(repuesto)) {
                    enListaRepuesto = true;
                }
            }

            if (enListaOperaciones || enListaRepuesto) {
                if (enListaOperaciones) {
                    ubicacionX = manoObraX;
                    ubicacionY = manoObraY + (diferenciaAlturaCuerpo * ubicacionEnLista);
                } else {
                    ubicacionX = repuestosX;
                    ubicacionY = repuestosY + (diferenciaAlturaCuerpo * ubicacionEnLista);
                }
                //AGREGAR LOS DATOS DEL DTO EN LA HOJA A IMPRIMIR
                g2d.drawString(dto.getValorCadena(), ubicacionX, ubicacionY);
            } else {
                listaImpresionAlFinal.add(dto);
            }

        }

        //AGREGA LOS DTO RESTANTES EN LAS ÚLTIMAS CASILLAS LIBRES
        if (listaImpresionAlFinal.size() > 5) {
            //DAR AVISO DE QUE NO SE PUEDEN AGREGAR TODOS LOS ELEMENTOS
        }
        for (int i = 0; i < listaImpresionAlFinal.size(); i++) {
            //dibujo el nombre del item que quedo colgado
            g2d.drawString(listaImpresionAlFinal.get(i).getNombreCadena(),
                    agregadosAlFinalX, agregadosAlFinalY + ((i + 1) * diferenciaAlturaCuerpo));
            //dibujo el valor del item que quedo colgado
            g2d.drawString(listaImpresionAlFinal.get(i).getValorCadena(),
                    agregadosAlFinalX, agregadosAlFinalY + ((i + 1) * diferenciaAlturaCuerpo));
        }
    }

    public void imprimirPresupuesto(ArrayList<DTOPresupuestoFinal> presupuestoDTO, Float importeTotal, Cliente client) throws PrinterException {


        //Organizo la cabecera
        DTOCabeceraImpresionPresupuesto dtoCabecera = new DTOCabeceraImpresionPresupuesto();

        Persona persona = client.getPersona();
        dtoCabecera.setCliente(client.getApellido() + ", " + persona.getNombre());
        dtoCabecera.setDomicilio(persona.getDireccion().getCalle());
        dtoCabecera.setLocalidad(persona.getDireccion().getLocalidad().getNombreLocalidad());
        dtoCabecera.setTelefono(persona.getNumeroTelefono());
        dtoCabecera.setFecha(null);

        //organizo el cuerpo del presupuesto
        /*
         Un presupuesto puede tener a lo sumo 1 block y 1 tapa
         eso son 2 DTOPresupuesto final
         Los repuestos deberian ser distintos para cada uno
         */
        ArrayList<DTOImpresionCadena> listaDatos = new ArrayList();

        for (DTOPresupuestoFinal dto : presupuestoDTO) {

            //busco todas las operaciones
            ArrayList<DTOCobroOperacionCUHacerPresupuesto> dtoOperaciones = dto.getM_DTOCobroOperacionCUHacerPresupuesto();
            for (DTOCobroOperacionCUHacerPresupuesto dtoOp : dtoOperaciones) {
                DTOImpresionCadena dtoNuevo = new DTOImpresionCadena();
                dtoNuevo.setNombreCadena(dtoOp.getNombreOperacion());
                String valor;
                String cantidad = String.valueOf(dtoOp.getCantidad());
                String valorUnitario = String.valueOf(dtoOp.getcobroOperacion());
                //formateo si la cantidad es mayor a 1
                if (dtoOp.getCantidad()> 1) {
                    valor = valorUnitario + "  (" + cantidad + ")";
                } else {
                    valor = valorUnitario;
                }

                dtoNuevo.setValorCadena(String.valueOf(valor));
                dtoNuevo.setValorCadena(dtoOp.getcobroOperacion());
                listaDatos.add(dtoNuevo);
            }

            //busco todos los repuestos
            ArrayList<DtoRepuestosElegidos> dtoRepuestos = dto.getM_DtoRepuestosElegidos();
            for (DtoRepuestosElegidos dtoRep : dtoRepuestos) {
                DTOImpresionCadena dtoNuevo = new DTOImpresionCadena();
                dtoNuevo.setNombreCadena(dtoRep.getnombreRepuesto());
                String cantidad = String.valueOf(dtoRep.getcantidadRepuesto());
                String valorUnitario = String.valueOf(dtoRep.getprecioRepuesto());
                String valor;

                //formateo si la cantidad es mayor a 1
                if (dtoRep.getcantidadRepuesto() > 1) {
                    valor = valorUnitario + "  (" + cantidad + ")";
                } else {
                    valor = valorUnitario;
                }
                dtoNuevo.setValorCadena(String.valueOf(valor));

                listaDatos.add(dtoNuevo);
            }

        }

        //dibujo la hoja a imprimir
        crearHojaImpresionPresupuesto(listaDatos, dtoCabecera);

        //indico la cantidad de hojas del presupuesto
        int index = 0;
        //creo un nuevo formato de hoja
        PageFormat pageFormat = new PageFormat();
        //imprimo
        print(g2d, pageFormat, index);
    }
 }
