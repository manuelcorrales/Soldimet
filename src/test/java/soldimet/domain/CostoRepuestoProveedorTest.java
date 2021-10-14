package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class CostoRepuestoProveedorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CostoRepuestoProveedor.class);
        CostoRepuestoProveedor costoRepuestoProveedor1 = new CostoRepuestoProveedor();
        costoRepuestoProveedor1.setId(1L);
        CostoRepuestoProveedor costoRepuestoProveedor2 = new CostoRepuestoProveedor();
        costoRepuestoProveedor2.setId(costoRepuestoProveedor1.getId());
        assertThat(costoRepuestoProveedor1).isEqualTo(costoRepuestoProveedor2);
        costoRepuestoProveedor2.setId(2L);
        assertThat(costoRepuestoProveedor1).isNotEqualTo(costoRepuestoProveedor2);
        costoRepuestoProveedor1.setId(null);
        assertThat(costoRepuestoProveedor1).isNotEqualTo(costoRepuestoProveedor2);
    }
}
