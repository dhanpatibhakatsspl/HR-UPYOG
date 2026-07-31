package org.egov.web.notification.sms;

import java.security.KeyStore;

import javax.annotation.PostConstruct;
import javax.net.ssl.SSLContext;

import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContexts;
import org.egov.hash.HashService;
import org.egov.tracer.config.TracerConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Import(TracerConfiguration.class)
@Slf4j
@EnableKafka
public class EgovNotificationSmsApplication {

    @Autowired
    private ApplicationContext context;

    @Autowired
    private Environment environment;

    public static void main(String[] args) {
        SpringApplication.run(EgovNotificationSmsApplication.class, args);
    }

    @PostConstruct
    private void init() {
        if (StringUtils.isEmpty(environment.getProperty("sms.provider.class"))) {
            log.error("The provider gateway has not been configured. Please configure sms.provider.class");
            int exitCode = SpringApplication.exit(context, (ExitCodeGenerator) () -> 1);
            System.exit(exitCode);
        }
    }

    @Primary
    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
    
//    @Bean
//    @Primary
//    public RestTemplate getRestTemplate() throws Exception {
//
//        KeyStore trustStore = KeyStore.getInstance("JKS");
//
//        ClassPathResource resource =
//                new ClassPathResource("certs/sms-truststore.jks");
//
//        trustStore.load(resource.getInputStream(),
//                "changeit".toCharArray());
//
//        SSLContext sslContext = SSLContexts.custom()
//                .loadTrustMaterial(trustStore, null)
//                .build();
//
//        CloseableHttpClient httpClient = HttpClients.custom()
//                .setSSLContext(sslContext)
//                .build();
//
//        HttpComponentsClientHttpRequestFactory factory =
//                new HttpComponentsClientHttpRequestFactory(httpClient);
//
//        return new RestTemplate(factory);
//    }

    @Primary
    @Bean
    public HashService getHashService() {
        return new HashService();
    }
    
    @Bean
    public ObjectMapper objectMapper(){
        return new ObjectMapper()
                .configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true)
                .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    }
}
