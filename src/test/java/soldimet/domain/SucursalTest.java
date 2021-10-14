package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class SucursalTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sucursal.class);
        Sucursal sucursal1 = new Sucursal();
        sucursal1.setId(1L);
        Sucursal sucursal2 = new Sucursal();
        sucursal2.setId(sucursal1.getId());
        assertThat(sucursal1).isEqualTo(sucursal2);
        sucursal2.setId(2L);
        assertThat(sucursal1).isNotEqualTo(sucursal2);
        sucursal1.setId(null);
        assertThat(sucursal1).isNotEqualTo(sucursal2);
    }
}
