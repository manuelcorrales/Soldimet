/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.docx4j.model.datastorage.migration.VariablePrepare;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import fr.opensagres.xdocreport.converter.ConverterRegistry;
import fr.opensagres.xdocreport.converter.ConverterTypeTo;
import fr.opensagres.xdocreport.converter.IConverter;
import fr.opensagres.xdocreport.converter.Options;
import fr.opensagres.xdocreport.core.document.DocumentKind;
import soldimet.constant.Globales;
import soldimet.domain.Cliente;
import soldimet.domain.CobranzaOperacion;
import soldimet.domain.CobranzaRepuesto;
import soldimet.domain.DetallePresupuesto;
import soldimet.domain.Operacion;
import soldimet.domain.Presupuesto;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.OperacionRepository;
import soldimet.repository.extendedRepository.ExtendedTipoRepuestoRepository;

/**
 *
 * @author Manu
 */
@Service
public class ExpertoImpresionRepuesto {
    /*
     * EL mapeo de donde se indica el valor de cada cosa o la cadena es directamente
     * en el documento de word acá busco cada una de las variables, las meto en el
     * contexto indicando que referencia en el documento es e imprimo y chau
     */

    private final Logger log = LoggerFactory.getLogger(ExpertoImpresionPresupuesto.class);

    @Autowired
    private OperacionRepository operacionRepository;

    @Autowired
    private ExtendedTipoRepuestoRepository tipoRepuestoRepository;

    @Autowired
    private Globales globales;

    public File imprimirPresupuesto(Presupuesto presupuesto, Float toal, Cliente cliente) throws Exception {

        HashMap<String, String> dto = this.crearMap(presupuesto);
        File impresion = this.printWithdocx4j(dto);
        return impresion;
    }

    private File convertToPdf(File archivo) throws Exception {

        // 1) Create options ODT 2 PDF to select well converter form the registry
        Options options = Options.getFrom(DocumentKind.DOCX).to(ConverterTypeTo.PDF);
        // 2) Get the converter from the registry
        IConverter converter = ConverterRegistry.getRegistry().getConverter(options);
        // 3) Convert DOCX 2 PDF
        InputStream in = new FileInputStream(archivo);
        File archivoPDF = new File("presupuesto.pdf");
        FileOutputStream out = new FileOutputStream(archivoPDF);
        converter.convert(in, out, options);
        out.close();

        return archivoPDF;

    }

    private File printWithdocx4j(HashMap<String, String> dtoImpresion) throws Exception {
        ClassPathResource resource = new ClassPathResource(globales.reporteHtmlPath);
        InputStream templateInputStream = resource.getInputStream();
        WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(templateInputStream);

        MainDocumentPart documentPart = wordMLPackage.getMainDocumentPart();
        VariablePrepare.prepare(wordMLPackage);

        documentPart.variableReplace(dtoImpresion);

        File archivo = new File("presupuesto.docx");
        FileOutputStream out = new FileOutputStream(archivo);
        wordMLPackage.save(out);
        out.close();

        File archivoPDF = this.convertToPdf(archivo);

        return archivoPDF;
    }

    private HashMap<String, String> crearMap(Presupuesto presupuesto) {
        HashMap<String, String> variables = new HashMap<>();
        variables.put("cliente", presupuesto.getClienteName());
        variables.put("fecha", presupuesto.getFechaCreacion().toString());
        variables.put("motor", presupuesto.getMotorName());
        variables.put("aplicacion", presupuesto.getAplicacionName());
        variables.put("numero", presupuesto.getId().toString());
        variables.put("totRep", "$" + presupuesto.getTotalRepuestos().toString());
        variables.put("total", "$" + presupuesto.getImporteTotal().toString());
        Float totalOperaciones = presupuesto.getImporteTotal() - presupuesto.getTotalRepuestos();
        variables.put("totOp", "$" + totalOperaciones.toString());
        variables.put("observaciones", presupuesto.getObservaciones());

        List<Operacion> operacionesPresupuesto = new ArrayList<Operacion>();
        for (DetallePresupuesto detalle : presupuesto.getDetallePresupuestos()) {
            for (CobranzaOperacion cobranza : detalle.getCobranzaOperacions()) {
                operacionesPresupuesto.add(cobranza.getOperacion());
            }
        }

        for (Operacion operacion : operacionRepository.findAll()) {
            String opNoElegida = "x" + operacion.getId().toString();
            variables.put(opNoElegida, "");

            for (Operacion operacionPresupuesto : operacionesPresupuesto) {
                if (operacion.getId().equals(operacionPresupuesto.getId())) {
                    // SI esta presupuestada, pongo una X
                    String opElegida = "x" + operacion.getId().toString();
                    variables.put(opElegida, "X");
                }
            }
        }

        List<CobranzaRepuesto> cobranzaRepuestos = new ArrayList<CobranzaRepuesto>();
        for (DetallePresupuesto detalle : presupuesto.getDetallePresupuestos()) {
            for (CobranzaRepuesto cobranza : detalle.getCobranzaRepuestos()) {
                cobranzaRepuestos.add(cobranza);
            }
        }

        for (TipoRepuesto tipoRepuesto : tipoRepuestoRepository.findAll()) {
            String repNoElegido = "v" + tipoRepuesto.getId().toString();
            variables.put(repNoElegido, "");
            for (CobranzaRepuesto cobranzaRepuesto : cobranzaRepuestos) {
                if (tipoRepuesto.getId().equals(cobranzaRepuesto.getTipoRepuesto().getId())) {
                    // SI esta presupuestado, pongo el valor que se cobro
                    String repElegido = "v" + tipoRepuesto.getId().toString();
                    variables.put(repElegido, "$" + cobranzaRepuesto.getValor().toString());
                }
            }
        }

        variables.put("v38", "");
        variables.put("v39", "");
        variables.put("x32", "");
        variables.put("x33", "");
        variables.put("x34", "");
        variables.put("x35", "");
        variables.put("v24", "");
        variables.put("v32", "");
        variables.put("v36", "");

        return variables;
    }

}
