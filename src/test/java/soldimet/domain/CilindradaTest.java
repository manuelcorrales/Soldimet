package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class CilindradaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cilindrada.class);
        Cilindrada cilindrada1 = new Cilindrada();
        cilindrada1.setId(1L);
        Cilindrada cilindrada2 = new Cilindrada();
        cilindrada2.setId(cilindrada1.getId());
        assertThat(cilindrada1).isEqualTo(cilindrada2);
        cilindrada2.setId(2L);
        assertThat(cilindrada1).isNotEqualTo(cilindrada2);
        cilindrada1.setId(null);
        assertThat(cilindrada1).isNotEqualTo(cilindrada2);
    }
}
