package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class RubroTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rubro.class);
        Rubro rubro1 = new Rubro();
        rubro1.setId(1L);
        Rubro rubro2 = new Rubro();
        rubro2.setId(rubro1.getId());
        assertThat(rubro1).isEqualTo(rubro2);
        rubro2.setId(2L);
        assertThat(rubro1).isNotEqualTo(rubro2);
        rubro1.setId(null);
        assertThat(rubro1).isNotEqualTo(rubro2);
    }
}
