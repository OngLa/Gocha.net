package kosa.afnica.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AppConfig {
    @Bean
    public WebClient carWebClient() {
        return WebClient.builder()
                .baseUrl("https://dev.kr-ccapi.hyundai.com/api/v1/car/status")
                .build();
    }
}