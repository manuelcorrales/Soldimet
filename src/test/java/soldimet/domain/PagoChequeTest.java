package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class PagoChequeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PagoCheque.class);
        PagoCheque pagoCheque1 = new PagoCheque();
        pagoCheque1.setId(1L);
        PagoCheque pagoCheque2 = new PagoCheque();
        pagoCheque2.setId(pagoCheque1.getId());
        assertThat(pagoCheque1).isEqualTo(pagoCheque2);
        pagoCheque2.setId(2L);
        assertThat(pagoCheque1).isNotEqualTo(pagoCheque2);
        pagoCheque1.setId(null);
        assertThat(pagoCheque1).isNotEqualTo(pagoCheque2);
    }
}
