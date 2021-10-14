package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class ListaPrecioDesdeHastaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ListaPrecioDesdeHasta.class);
        ListaPrecioDesdeHasta listaPrecioDesdeHasta1 = new ListaPrecioDesdeHasta();
        listaPrecioDesdeHasta1.setId(1L);
        ListaPrecioDesdeHasta listaPrecioDesdeHasta2 = new ListaPrecioDesdeHasta();
        listaPrecioDesdeHasta2.setId(listaPrecioDesdeHasta1.getId());
        assertThat(listaPrecioDesdeHasta1).isEqualTo(listaPrecioDesdeHasta2);
        listaPrecioDesdeHasta2.setId(2L);
        assertThat(listaPrecioDesdeHasta1).isNotEqualTo(listaPrecioDesdeHasta2);
        listaPrecioDesdeHasta1.setId(null);
        assertThat(listaPrecioDesdeHasta1).isNotEqualTo(listaPrecioDesdeHasta2);
    }
}
