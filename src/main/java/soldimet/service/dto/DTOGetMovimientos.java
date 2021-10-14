package soldimet.service.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DTOGetMovimientos {

    public Long sucursalId;
    private String fechaInicio;
    private String fechaFin;
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/d/yyyy");

    public DTOGetMovimientos() {}

    public LocalDate getFechaFin() {
        return LocalDate.parse(this.fechaFin, this.formatter);
    }

    public LocalDate getFechaInicio() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/d/yyyy");
        try {
            Date de = simpleDateFormat.parse(this.fechaInicio);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Boolean isRange() {
        return this.fechaInicio != null;
    }

    public Boolean isZoneFiltered() {
        return sucursalId != null;
    }
}
