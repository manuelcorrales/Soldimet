/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;


import com.netflix.discovery.converters.Auto;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.NPOIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Hyperlink;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.constant.Globales;
import soldimet.domain.Articulo;
import soldimet.domain.EstadoArticulo;
import soldimet.domain.HistorialPrecio;
import soldimet.domain.Marca;
import soldimet.domain.Persona;
import soldimet.domain.PrecioRepuesto;
import soldimet.domain.Proveedor;
import soldimet.domain.Rubro;
import soldimet.domain.TipoParteMotor;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.ArticuloRepository;
import soldimet.repository.EstadoArticuloRepository;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import soldimet.repository.HistorialPrecioRepository;
import soldimet.repository.PersonaRepository;
import soldimet.repository.PrecioRepuestoRepository;
import soldimet.repository.ProveedorRepository;
import soldimet.repository.RubroRepository;
import soldimet.repository.TipoParteMotorRepository;
import soldimet.repository.TipoRepuestoRepository;


/**
 *
 * @author Manu
 */
@Service
@Transactional
public class EstrategiaCargarRepuestosProveedorExcelPazzagliaSAPorLineaRubro implements EstrategiaCargarRepuestosProveedor {

    //Array que contiene todos los tipo de repuesto que no se le asigna un tipo motor hasta el ultimo paso
    private final ArrayList<TipoRepuesto> listaDeTipoRepuestosSinParteMotor = new ArrayList();

    @Autowired
    private Globales globales;

    @Autowired
    private ArticuloRepository articuloRepository;

    @Autowired
    private TipoRepuestoRepository tipoRepuestoRepository;

    @Autowired
    private RubroRepository rubroRepository;

    @Autowired
    private EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private EstadoArticuloRepository estadoArticuloRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;

    @Autowired
    private HistorialPrecioRepository historialPrecioRepository;

    @Autowired
    private PrecioRepuestoRepository precioRepuestoRepository;

    @Autowired
    private TipoParteMotorRepository tipoParteMotorRepository;

    @Autowired
    private PersonaRepository personaRepository;

    private HSSFWorkbook libro;

    //atributo de la barra de progreso
    private Integer totalCategoriasCheckPoint = 0;
    private String cadenaFinalizando = "Finalizando últimos pasos";

    //lista de cadenas con los pasos que se realizan
    //atributos del articulo en un momento determinado
    private Marca marca;
    private Rubro rubro;
    private TipoRepuesto tipoRep;
    private Proveedor proveedor;

    //mensajes de errores
    private final String mensajeNoSePudoFormarLaCadenaMarca = "No se pudo definir el nombre del rubro para el rubro :";
    private final String mensajeCanceladoPorElUsuario = "Operación cancelada por el usuario.";
    private final String mensajeNoEsUnArchvioDePazzaglia = " El archivo indicado no pertenece al proveedor Pazzaglia";


    //Defino una lista de String con los nombres de los rubros de pazzaglia por que estan ordenados asi
    @Override
    public void cargarRepuestos(String fuente, String prov, String rubro, String descripcion,
            String marca, String tiporepuesto, float precio, String codigoArticuloProveedor, String ubicacion) {

        try {
            File archivo = new File(ubicacion);
            cargarArchivo(archivo, prov);
            Sheet hoja = libro.getSheetAt(0);

            //primero itero en la primer hoja para definir cuantas categorias se van a mirar
            //para definir el numero total a la barra de progeso
            Iterator rows = hoja.rowIterator();//iterador de filas
            Hyperlink link = null;
            while (rows.hasNext()) {
                HSSFRow row = (HSSFRow) rows.next(); //fila actual
                Cell celda = row.getCell(1);

                if (celda.getHyperlink() != null) {//me fijo si tiene hipervinculo entonces es una categoria

                }
                totalCategoriasCheckPoint = +1;
            }

            //ahora itero por las categorias y empiezo la busqueda
            rows = hoja.rowIterator();//iterador de filas
            link = null;

            while (rows.hasNext()) {
                HSSFRow row = (HSSFRow) rows.next(); //fila actual
                Cell celda = row.getCell(1);

                link = celda.getHyperlink();//obtengo el link de la categoria (motor, lubricante, etc)

                if (link != null) {
                    //obtengo la hoja donde apunta el hipervinculo
                    Sheet hojaMotor = obtenerHojaDeHipervinculo(link);
                    String nombreCheckPointCategoria = celda.getStringCellValue();
                    iterarCategoria(hojaMotor);
                    totalCategoriasCheckPoint = -1;

                }

            }

        } catch (NullPointerException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void iterarCategoria(Sheet hojaMotor) throws Exception {

        /*
         Comienzo a pasar rubro por rubro y voy agregando o modificando
         articulos
         */
        Iterator rows = hojaMotor.rowIterator();//iterador de filas
        //busco todos los tipos de repuesto para comparar mas adelante
        List<TipoRepuesto> listaTipoRepuestos = tipoRepuestoRepository.findAll();

        while (rows.hasNext()) {
            HSSFRow row = (HSSFRow) rows.next(); //fila actual
            Cell celda = row.getCell(1);//columna 1

            String nombreRubroEnCelda = celda.getStringCellValue();//obtengo el nombre del rubro

            if (nombreRubroEnCelda.contains("*")) {
                nombreRubroEnCelda = nombreRubroEnCelda.replace("*", ""); //saco todos los *
            }

            //busco si el rubo ya existe
            this.rubro = rubroRepository.findByNombreRubro(nombreRubroEnCelda);

            if (this.rubro == null) {
                //si el rubro no existe creo uno nuevo
                Rubro rubro = new Rubro();
                rubro.setNombreRubro(nombreRubroEnCelda);
                this.rubro = rubro;
                this.rubroRepository.save(rubro);
            }

            /*
            El rubro esta compuesto por la Marca y el Tipo de repuesto
            Debo sacar de la primer palaba con numeros  LA MARCA
            y del conjunto de palabras que quedan obtengo EL TIPO DE REPUESTO


            Ademas tengo que ver las abreviaturas y dejar harcodeado el cambio de las mas comunes
            Y debo hacer una última iteración en el tipo de repuesto para asegurar que no quede ningun (,),*,-


            EN UNA PROXIMA ITERACIÓN VOY A HACER UNA BUSQUEDA PREVIA QUE COMPARE TODOS LOS ELEMENTOS
            Y BUSQUE LAS ABREVITURAS QUE NO CONOZCA Y LE PIDA AL USUARIO QUE INDIQUE QUE ES LO QUE ES
            ESTO VA A IR LLENANDO UN ARCHIVO DE TEXTO PLANO O UNA TABLA EN LA BASE DE DATOS QUE MANEJE
            LA ABREVIATURA YA CONOCIDA CON LO QUE REALMENTE DEBERÍA SER

             */
            //separo el rubro en un vector con cada palabra del nombre
            String nombreRub = this.rubro.getNombreRubro();
            String[] nombres = nombreRub.split(" ");

            //para definir la MARCA busco la primer palabra
            Marca marc = new Marca();

            String nombreMarca = "";
            //hago un bucle en el conjunto de palabras y despues otro bucle en cada caracter de la palabra
            for (int indice = 0; indice < nombres.length; indice++) {

                Integer contador = 0;
                for (int i = 0; i < nombres[i].length(); i++) {
                    if (Character.isUpperCase(nombres[indice].charAt(indice))) {
                        contador = +1;
                    }
                }
                if (contador == nombres[indice].length() || isNumeric(nombres[indice])) {
                    //TODA LA PALABRA ESTA EN MAYUSCULA (o contiene numeros) ASI QUE LA AGREGO AL NOMBRE DE LA MARCA
                    nombreMarca += nombres[indice];
                }

            }
            if (nombreMarca.isEmpty()) {
                throw new Exception(mensajeNoSePudoFormarLaCadenaMarca + nombreRub);
            } else {
                marc.setNombreMarca(nombreMarca);
            }

            this.marca = marc;

            //para definir el tipo de repuesto debo buscar todo lo que sobro del rubro que no es la marca, borrando (,),*,-
            //y agrego espacios entre cada palabra
            //en otra iteración voy a buscar la cadena completa sin la marca en un archivo de texto o en la BD
            //para cambiarlo por el nombre correcto
            String tipo = "";
            //elimino el primero elemento del vector por que es la marca

            for (int i = 1; i < nombres.length; i++) {
                tipo += nombres[i] + " ";
            }

            //ahora reemplazo los simbolos raros
            String replaceAll = tipo.replaceAll("\\*", "");
            String replaceAll1 = replaceAll.replaceAll("\\(", "");
            String replaceAll2 = replaceAll1.replaceAll("\\)", "");
            tipo = replaceAll2.replaceAll("\\-", "");

            TipoRepuesto tipoExistente = tipoRepuestoRepository.findByNombreTipoRepuesto(tipo);

            if (tipoExistente == null) {

                TipoRepuesto tipoRepuesto = new TipoRepuesto();
                tipoRepuesto.setNombreTipoRepuesto(tipo);

                postergarAsignacionDeTipoMotorATipoRepuesto(tipoRepuesto);

                this.tipoRep = tipoRepuesto;
                tipoRepuestoRepository.save(tipoRepuesto);
            } else {
                this.tipoRep = tipoExistente;
            }

            /*
            //paso por cada repuesto
            for (TipoRepuesto tipo : listaTipoRepuestos) {

                String nombreTipo = tipo.getNombreTipoRepuesto();
                //si el nombre del rubro esta dentro del tipo de repuesto
                //lo saco del nombre hasta obtener solo la marca
                for (String nombre : nombres) {
                    if (nombreTipo.contains(nombre)) {
                        nombreTipo = nombreTipo.replaceFirst(nombre, "");
                    }
                }
                nombreTipo = nombreTipo.replace(" ", "");//saco los espacios
                marc = new Marca();
                Integer marcaID = (Integer) IndireccionPersistencia.getInstance()
                        .Buscar("mar.marcaID", "Marca as mar", "mar.marcaID=mar.marcaID Order By mar.marcaID DESC LIMIT 1");
                marc.setnombreMarca(nombreTipo);//queda solo el nombre de la marca
                if (marcaID == null) {
                    marcaID = 1;
                } else {
                    marcaID = marcaID + 1;
                }
                marc.setMarcaId(marcaID);
                this.marca = marc;
                this.tipoRep = tipo;

            }
             */
            //ahora voy por cada fila del archivo buscando articulos
            //si el articulo existe (con el id del proveedor) modifico el precio
            //si no existe, creo un articulo nuevo
            buscarArticulos(celda.getHyperlink());

        }

    }

    private void cargarArchivo(File archivo, String proveedor) {

        try {
            // HSSFWorkbook, File
            NPOIFSFileSystem fs = new NPOIFSFileSystem(archivo);
            libro = new HSSFWorkbook(fs.getRoot(), true);
            corroborarPrecedencia();

        } catch (IOException | NullPointerException ex) {
            ex.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private Sheet obtenerHojaDeHipervinculo(Hyperlink link) {
        //obtengo la direccion del hipervinculo
        String direcion = link.getAddress();
        //creo la referencia con la direccion asi puedo manejarla(el nombre de la hoja)
        CellReference referencia = new CellReference(direcion);
        //obtengo del libro la hoja con el nombre de la referencia
        Sheet hoja = libro.getSheet(referencia.getSheetName());

        return hoja;

    }

    //verifico si el archivo es de pazzaglia
    private void corroborarPrecedencia() throws Exception {
        Sheet primeraHoja = libro.getSheetAt(0);

        Row row = primeraHoja.getRow(0);
        Cell celda = row.getCell(1);
        String nombre = celda.getStringCellValue();
        if (!nombre.contentEquals(globales.PAZZAGLIA)) {
            //no es de pazzaglia
            //DAR AVISO DE QUE NO ES UN ARCHIVO DE PAZZAGLIA
            //FIN CU
            throw new Exception(mensajeNoEsUnArchvioDePazzaglia);
        } else {
            Persona persona = personaRepository.findPersonaByNombre(globales.PAZZAGLIA);
            this.proveedor = proveedorRepository.findByPersona (persona);
        }

    }

    private void buscarArticulos(Hyperlink link) {
        try {
            Sheet hoja = obtenerHojaDeHipervinculo(link);

            /*
         A           B       C       D           E           F       G           H           I
         Cod.Rubro   Rubro   Cod.Art Desc.Art    Prec.Cata   DTO(-20)DTO(-20-10) DTO.Extra   F.Modif
             */
            int columnaDescripcionArt = 3;
            int columnaCodArt = 2;
            int columnaPrecioAlPublico = 4;
            int columnaPrecioAlPrivado = 5;
            int columnaFecMod = 8;

            //busco el estado de alta
            EstadoArticulo estadoAlta = estadoArticuloRepository.findByNombreEstado(globales.NOMBRE_ESTADO_ARTICULO_ALTA);

            //paso fila a fila y voy viendo si creo o modifico el precio de articulos
            for (int i = 7; i < hoja.getLastRowNum(); i++) {

                //busco el codigo del articulo-proveedor
                Row fila = hoja.getRow(i);
                Cell celda = fila.getCell(columnaCodArt);
                String codArtProv = celda.getStringCellValue();

                //me fijo si existe el articulo
                Articulo articulo = articuloRepository.findByCodigoArticuloProveedor(codArtProv);

                if (articulo == null) {
                    //si no existe creo un articulo nuevo
                    articulo = new Articulo();

                    articulo.setCodigoArticuloProveedor(codArtProv);
                    articulo.setMarca(marca);
                    articulo.setRubro(rubro);
                    articulo.setTipoRepuesto(tipoRep);
                    articuloRepository.save(articulo);

                }
                //obtengo la descripcion del articulo
                String descripcion = fila.getCell(columnaDescripcionArt).getStringCellValue();

                //me fijo si ya hay un precio y le doy de baja
                if (!articulo.getHistorialPrecios().isEmpty()) {
                    for (HistorialPrecio historia : articulo.getHistorialPrecios()) {
                        if (historia.getPrecioRepuesto().getFecha() == null) {
                            historia.getPrecioRepuesto().setFecha(LocalDate.now());//le pongo fecha final
                        }
                    }
                }

                PrecioRepuesto precio = new PrecioRepuesto();

                precio.setPrecioPublico(Float.valueOf(fila.getCell(columnaPrecioAlPublico).getStringCellValue()));
                precio.setPrecioPrivado(Float.valueOf(fila.getCell(columnaPrecioAlPrivado).getStringCellValue()));
                //precio.setPrecioRepuestoId(ultimoID);
                precio.setFecha(null);
                precioRepuestoRepository.save(precio);

                //el historial
                HistorialPrecio historia = new HistorialPrecio();
                historia.setFechaHistorial(LocalDate.now());
                //historia.setHistorialPrecioId(ultimoID);
                historia.setPrecioRepuesto(precio);
                historialPrecioRepository.save(historia);

                //asigno
                articulo.setEstado(estadoAlta);
                articulo.getHistorialPrecios().add(historia);
                articulo.setProveedor(proveedor);
                articulo.setDescripcion(descripcion);
                articuloRepository.save(articulo);

            }

        } catch (NullPointerException e) {
             e.printStackTrace();
        }

    }

    public static boolean isNumeric(String str) {
        try {
            double d = Double.parseDouble(str);
        } catch (NumberFormatException nfe) {
            return false;
        }
        return true;
    }

    private void postergarAsignacionDeTipoMotorATipoRepuesto(TipoRepuesto tipoRep) {

        listaDeTipoRepuestosSinParteMotor.add(tipoRep);

    }

    //recibo la posicion del array que contiene el tipo de repuesto
    //y el tipo parte de motor para asignarlo y terminar de guardarlo
    public void asignarTipoMotorATipoRepuesto(String tipoMotorOID, Integer numeroEnArray) {

        Long idParteMotor = Long.valueOf(tipoMotorOID);

        TipoRepuesto tipoRepuesto = listaDeTipoRepuestosSinParteMotor.get(numeroEnArray);

        tipoRepuestoRepository.save(tipoRepuesto);

    }

}
