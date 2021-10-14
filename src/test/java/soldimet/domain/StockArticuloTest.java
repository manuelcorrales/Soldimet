package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class StockArticuloTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StockArticulo.class);
        StockArticulo stockArticulo1 = new StockArticulo();
        stockArticulo1.setId(1L);
        StockArticulo stockArticulo2 = new StockArticulo();
        stockArticulo2.setId(stockArticulo1.getId());
        assertThat(stockArticulo1).isEqualTo(stockArticulo2);
        stockArticulo2.setId(2L);
        assertThat(stockArticulo1).isNotEqualTo(stockArticulo2);
        stockArticulo1.setId(null);
        assertThat(stockArticulo1).isNotEqualTo(stockArticulo2);
    }
}
