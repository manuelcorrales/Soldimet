package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class MedioDePagoChequeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedioDePagoCheque.class);
        MedioDePagoCheque medioDePagoCheque1 = new MedioDePagoCheque();
        medioDePagoCheque1.setId(1L);
        MedioDePagoCheque medioDePagoCheque2 = new MedioDePagoCheque();
        medioDePagoCheque2.setId(medioDePagoCheque1.getId());
        assertThat(medioDePagoCheque1).isEqualTo(medioDePagoCheque2);
        medioDePagoCheque2.setId(2L);
        assertThat(medioDePagoCheque1).isNotEqualTo(medioDePagoCheque2);
        medioDePagoCheque1.setId(null);
        assertThat(medioDePagoCheque1).isNotEqualTo(medioDePagoCheque2);
    }
}
