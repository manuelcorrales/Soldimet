package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class ListaPrecioRectificacionCRAMTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ListaPrecioRectificacionCRAM.class);
        ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM1 = new ListaPrecioRectificacionCRAM();
        listaPrecioRectificacionCRAM1.setId(1L);
        ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM2 = new ListaPrecioRectificacionCRAM();
        listaPrecioRectificacionCRAM2.setId(listaPrecioRectificacionCRAM1.getId());
        assertThat(listaPrecioRectificacionCRAM1).isEqualTo(listaPrecioRectificacionCRAM2);
        listaPrecioRectificacionCRAM2.setId(2L);
        assertThat(listaPrecioRectificacionCRAM1).isNotEqualTo(listaPrecioRectificacionCRAM2);
        listaPrecioRectificacionCRAM1.setId(null);
        assertThat(listaPrecioRectificacionCRAM1).isNotEqualTo(listaPrecioRectificacionCRAM2);
    }
}
