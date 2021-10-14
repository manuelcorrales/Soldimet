package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class DocumentationTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentationType.class);
        DocumentationType documentationType1 = new DocumentationType();
        documentationType1.setId(1L);
        DocumentationType documentationType2 = new DocumentationType();
        documentationType2.setId(documentationType1.getId());
        assertThat(documentationType1).isEqualTo(documentationType2);
        documentationType2.setId(2L);
        assertThat(documentationType1).isNotEqualTo(documentationType2);
        documentationType1.setId(null);
        assertThat(documentationType1).isNotEqualTo(documentationType2);
    }
}
