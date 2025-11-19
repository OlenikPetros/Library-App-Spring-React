package toolboxBackEnd.app.config.database;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import javax.sql.DataSource;
import java.util.Properties;

@EnableJpaRepositories(
        basePackages = {
                "toolboxBackEnd.app.auditLogs.repository",
                "toolboxBackEnd.app.services.atlas.database.repository",
                "toolboxBackEnd.app.services.brond.database.repository",
                "toolboxBackEnd.app.services.ntnorth.common.database.repository"
        },
        entityManagerFactoryRef = "voiceEntityManagerFactory",
        transactionManagerRef = "voiceTransactionManager"
)
@Configuration
public class VoiceDBDatasourceConfiguration {

    @Bean(name = "voiceDBProperties")
    @Primary
    @ConfigurationProperties("spring.datasource.voice-db")
    public DataSourceProperties voiceDBDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "voiceDataSource")
    @Primary
    public DataSource voiceDataSource(@Qualifier("voiceDBProperties") DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }


    @Bean(name = "voiceEntityManagerFactory")
    @Primary
    public LocalContainerEntityManagerFactoryBean voiceEntityManagerFactory(
            @Qualifier("voiceDataSource") DataSource voiceDataSource) {

        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(voiceDataSource);
        em.setPackagesToScan("toolboxBackEnd.app.auditLogs.entity","toolboxBackEnd.app.services.atlas.database.entity","toolboxBackEnd.app.services.brond.database.entity","toolboxBackEnd.app.services.ntnorth.common.database.entity");

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setGenerateDdl(true);
        vendorAdapter.setShowSql(true);
        em.setJpaVendorAdapter(vendorAdapter);

        Properties jpaProperties = new Properties();
        jpaProperties.setProperty("hibernate.hbm2ddl.auto", "update");
        jpaProperties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
        em.setJpaProperties(jpaProperties);

        em.setPersistenceUnitName("voiceDB");
        return em;
    }

    @Bean(name = "voiceTransactionManager")
    @Primary
    public PlatformTransactionManager voiceDBTransactionManager(
            @Qualifier("voiceEntityManagerFactory") LocalContainerEntityManagerFactoryBean entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory.getObject());
    }
}


