package soldimet.featureFlags;

import javax.sql.DataSource;
import org.ff4j.FF4j;
import org.ff4j.audit.repository.EventRepository;
import org.ff4j.audit.repository.JdbcEventRepository;
import org.ff4j.springjdbc.store.FeatureStoreSpringJdbc;
import org.ff4j.springjdbc.store.PropertyStoreSpringJdbc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FF4JConfiguration {

    @Autowired
    DataSource dataSource;

    @Bean
    public FF4j getFF4j() {
        // Initialization of your DataSource
        // Init the framework full in memory
        FF4j ff4j = new FF4j("ff4j-features.xml");

        // Feature States in a RDBMS
        FeatureStoreSpringJdbc featureStore = new FeatureStoreSpringJdbc();
        featureStore.setDataSource(dataSource);
        ff4j.setFeatureStore(featureStore);

        // Properties in RDBMS
        PropertyStoreSpringJdbc propertyStore = new PropertyStoreSpringJdbc();
        featureStore.setDataSource(dataSource);
        ff4j.setPropertiesStore(propertyStore);

        // Audit in RDBMS
        // So far the implementation with SpringJDBC is not there, leverage on default JDBC
        EventRepository auditStore = new JdbcEventRepository(dataSource);
        ff4j.setEventRepository(auditStore);

        ff4j.audit(true);
        return ff4j;
    }
}
