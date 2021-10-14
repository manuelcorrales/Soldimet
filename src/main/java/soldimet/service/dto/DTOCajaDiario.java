package soldimet.service.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:37 p.m.
 */
public class DTOCajaDiario {

    private String name; // Sucursal
    public List<DTOSerie> series = new ArrayList<DTOSerie>();

    public DTOCajaDiario() {}

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @return the series
     */
    public List<DTOSerie> getSeries() {
        return series;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @param series the series to set
     */
    public void setSeries(List<DTOSerie> series) {
        this.series = series;
    }

    public void addSerie(DTOSerie serie) {
        this.series.add(serie);
    }
}
