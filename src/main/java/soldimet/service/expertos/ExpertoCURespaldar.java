/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ModeloDeClases.EstadoPresupuesto;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;
import ModeloDeClases.MetodoRespaldo;
import factoria.FactoriaEstrategiaRespaldar;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Manu
 */


public class ExpertoCURespaldar {
    //este experto se encarga de mostrar las posibles formas de respaldo de la base de datos disponibles
    //Tambien se encarga de hacer el dropeo de las nombreTablas
    //y pasar todo a un txt

    private MetodoRespaldo nombreEstrategiaRespaldo;    //estrategia de respaldo elegida
    private String carpetaFinal;    //direcccion de la carpeta con archivos


    //muestro las formas de respaldo en pantalla
    public ArrayList<String> iniciarCU(){
        ArrayList<String> estrategias = new ArrayList();

        ArrayList<String> metodosBusqueda = (ArrayList<String>)IndireccionPersistencia.getInstance()
                .Buscar("nombreMetodoRespaldo", "MetodoRespaldo", "habilitado = true");

        for(String metodo: metodosBusqueda){
            estrategias.add(metodo);
        }

        return estrategias;
    }

    //le paso la ubicacion del archivo txt que quiero respaldar
    //y respaldo donde sea que toque XD
    public void respaldar(String ubicacion, String estrategia, Boolean borrar){

        //busco la estrategia elegida para hacer el respaldo
        MetodoRespaldo estrategiaRespaldo = (MetodoRespaldo)IndireccionPersistencia.getInstance()
                .Buscar("*", "MetodoRespaldo", "habilitado = true and nombreMetodoBusqueda= "+estrategia);

        setNombreEstrategiaRespaldo(estrategiaRespaldo);

        //voy a crear una carpeta con el siguiente formato
        //Soldimet'Fecha''Taller'
        //creo la fecha y su formato
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yy");
        Date date = new Date();

        //busco la sucursal
        String sucursal =(String)IndireccionPersistencia.getInstance()
                .Buscar("nombreSucursal", "ParametroGeneral", "oid=oid");

        carpetaFinal=ubicacion+"/Soldimet"+dateFormat.format(date)+sucursal;//guardo en el experto la ubicacion final


        File carpeta = new File(carpetaFinal);//puntero a la ubicacion
        carpeta.mkdirs();//creo la carpeta y directorio


        //creo el TXT con la informacion
        crearTXT(carpetaFinal);

        //creo la estrategia elegida
        EstrategiaRespaldar estra = new FactoriaEstrategiaRespaldar().buscarEstrategia(estrategia);

        Boolean resultado = estra.respaldar(carpetaFinal);//respaldo los archivos


        //si el usuario acepta y ya se respaldo todo, elimino la información
        if(borrar && resultado){

            try {
                eliminarInfo(carpetaFinal);
                IndireccionPersistencia.getInstance().commit();

            } catch (IOException | ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
                Logger.getLogger(ExpertoCURespaldar.class.getName()).log(Level.SEVERE, null, ex);
                IndireccionPersistencia.getInstance().rollback();
            }

        }




    }

    //creo todos los TXT en la ubicacion pasada por parámetro
    private void crearTXT(String ubicacion){
        //Busqueda de todas las nombreTablas de la BD
        /*
        SELECT TABLE_NAME FROM INFORMATION_SCHEMA.tables WHERE TABLE_SCHEMA='soldimetprueba' ;
        */
        //Busqueda de todas las columnas de una tabla
        /*
        SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
        WHERE table_name = 'nombretabla'
        AND table_schema = 'soldimetprueba'
        */

        /*
        into outfile +ubicacion+
        fields terminated by ',' lines terminated by '\n\r'
        */


//busco todas los nombres de nombreTablas de la base de datos
        ArrayList<String> nombreTablas =(ArrayList<String>)IndireccionPersistencia.getInstance()
                .Buscar("TABLE_NAME", "INFORMATION_SCHEMA.tables", "TABLE_SCHEMA='soldimetprueba'");


//por cada tabla creo un txt en la carpeta creada
        for(String tabla:nombreTablas){

            //busco todas las columnas de la tabla
            ArrayList<String> columnas =(ArrayList<String>)IndireccionPersistencia.getInstance()
                    .Buscar("COLUMN_NAME",
                            "INFORMATION_SCHEMA.COLUMNS",
                            "table_name = "+tabla+"AND table_schema = 'soldimetprueba'");

            String columnasBuscadas="";

            //agrego todas las columnas en un String
            for(String columna:columnas){
                columnasBuscadas= columnasBuscadas.concat(","+columna);
            }
            //elimino la columna OID y la pongo al FINAL
            columnasBuscadas= columnasBuscadas.replace(",oid","");
             columnasBuscadas= columnasBuscadas.concat(",oid");

            //elimino la primera coma de la lista de nombreTablas
            columnasBuscadas= columnasBuscadas.replaceFirst(",", "");

            //busco los valores de las columnas de esta tabla y la guardo en un txt con el nombre de la tabla
            IndireccionPersistencia.getInstance()
                .Buscar(columnasBuscadas, tabla, "oid=oid into outfile "+carpetaFinal+"/"+tabla+".txt"+" fields terminated by ',' lines terminated by '\\n\\r'");

        }




    }

    //si acepto eliminar la informacion ejecuto este metodo
    private void eliminarInfo(String ubicacion) throws FileNotFoundException, IOException, ClassNotFoundException, InstantiationException, IllegalAccessException {

        File carpeta = new File(carpetaFinal);//puntero a la ubicacion
        File[] archivos = carpeta.listFiles();//busco los archivos txt

        //paso todo a un list
        ArrayList<File> archivosCarpeta = new ArrayList();
        for(int i = 0;i<archivos.length;i++){
            archivosCarpeta.add(archivos[i]);
        }


        //dejo solamente los que quiero borrar
        ArrayList<File> archivoABorrar = new ArrayList();

        //contenedor con las clases a borrar
        ArrayList<String> comparador = new ArrayList();
        comparador.add("Presupuesto");
        comparador.add("DetallePresupuesto");
        comparador.add("CobranzaOperacion");
        comparador.add("Pedido");
        comparador.add("DetallePedido");
        comparador.add("CobranzaPresupuesto");
        comparador.add("CobranzaSoldadura");
        comparador.add("Cobranza");
        comparador.add("PagoCliente");
        comparador.add("PagoProveedor");
        comparador.add("PagoEmpleado");
        comparador.add("SubCategoriaOtro");
        comparador.add("Movimiento");
        comparador.add("FormaDePago");
        comparador.add("PagoCheque");
        comparador.add("Efectivo");
        comparador.add("PagoTarjeta");
        comparador.add("Caja");

        //comparo la lista de tabla con la de archivos, dejo solo las que no estan preseleccionadas
        //son 3 listas, la de archivos, la de tablas y la que tiene solo las que quiero borrar
        for(File tXT:archivosCarpeta){
            Boolean existe = false;
            for(String comparacion:comparador){
               if( tXT.getName().contains(comparacion)){
                   archivoABorrar.add(tXT);
               }
            }
        }

        //para la caja me fijo que los pedidos esten pagados completamente
        //para la caja me fijo que los presupuestos esten entregados
        //para los pedidos me fijo que sean de presupuestos entregados
        //para los presupuestos me fijo que esten entregados

        //EN RESUMEN BUSCO LOS QUE EL PRESUPUESTO ESTE ENTREGADO
        //SINO, NO LO BORRO

        //me fijo los presupuestos que ya estan entregados
        EstadoPresupuesto estadoEntregado =(EstadoPresupuesto)IndireccionPersistencia.getInstance()
                .Buscar("*", "EstadoPresupuesto", "nombreEstadoPresupuesto= Entregado");
        long oidEstadoEntregado = estadoEntregado.getOid();

        for(File tXT:archivoABorrar){

            try {
                FileReader fr = new FileReader(tXT);//manejador I/O bajo nivel
                BufferedReader br = new BufferedReader(fr); //optimizador de acceso a disco
                String linea;//una linea de texto vacia
                while((linea = br.readLine()) != null){//mientras existan lineas de texto no nulas
                    if(!linea.contains(String.valueOf(oidEstadoEntregado))){//si la linea NO tiene el ID
                        //ELIMINO LA LINEA DEL TXT
                        //AL FINAL ME FALTA BORRAR LA CARPETA CON TODOS LOS ARCHIVOS
                    }
                }

                fr.close();
                 }catch(Exception e) {

                }
        }
        //por cada archivo busco el oid de la tabla y elimino la tupla

        for(File txt:archivoABorrar){

            String tabla = txt.getName();//nombre
            tabla= tabla.replace(".txt","" );//le borro el tipo de archivo
            String cadena;//linea

            FileReader f = new FileReader(txt);//lector
            BufferedReader b = new BufferedReader(f);//buffer

            cadena = b.readLine();//obtengo una linea entera

            //obtengo el OID
            String[] lista = cadena.split(",");
            String oidS= lista[lista.length];
            Integer oid =Integer.valueOf(oidS);

            Object obj= Class.forName(tabla).newInstance();//creo un objeto del tipo de tabla


            Object borrame = IndireccionPersistencia.getInstance().Buscar(oid, obj);//busco el objeto concreto
            IndireccionPersistencia.getInstance().borrar(borrame);//borro el objeto concreto
        }



    }


    private MetodoRespaldo getNombreEstrategiaRespaldo() {
        return nombreEstrategiaRespaldo;
    }

    private void setNombreEstrategiaRespaldo(MetodoRespaldo nombreEstrategiaRespaldo) {
        this.nombreEstrategiaRespaldo = nombreEstrategiaRespaldo;
    }






}
