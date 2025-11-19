package toolboxBackEnd.app.config.database;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableJpaRepositories(
        basePackages = "toolboxBackEnd.app.services.entraId.database.repository", // your repository package
        entityManagerFactoryRef = "entraIDEntityManagerFactory",
        transactionManagerRef = "entraIDTransactionManager"
)
public class EntraIdDatasourceConfiguration {

    @Bean(name = "entraID")
    @ConfigurationProperties("spring.datasource.entra-id")
    public DataSourceProperties entraIDDataSourceProperties() {
        return new DataSourceProperties();
    }
    @Bean(name = "entraIDDataSource")
    public DataSource entraIDDataSource(@Qualifier("entraID") DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }


    @Bean(name = "entraIDEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entraIDEntityManagerFactory(
            @Qualifier("entraIDDataSource") DataSource dataSource) {

        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan("toolboxBackEnd.app.services.entraId.database.entity"); // your entraID entities
        em.setPersistenceUnitName("entraID");

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setShowSql(true);
        vendorAdapter.setGenerateDdl(true);
        em.setJpaVendorAdapter(vendorAdapter);

        Properties jpaProperties = new Properties();
        jpaProperties.setProperty("hibernate.hbm2ddl.auto", "update");
        jpaProperties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
        em.setJpaProperties(jpaProperties);

        return em;
    }





    @Bean
    public PlatformTransactionManager entraIDTransactionManager(
            @Qualifier("entraIDEntityManagerFactory") LocalContainerEntityManagerFactoryBean entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory.getObject());
    }



}


