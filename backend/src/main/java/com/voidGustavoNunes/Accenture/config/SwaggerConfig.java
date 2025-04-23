package com.voidGustavoNunes.Accenture.config;


import java.util.List;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI customApi() {
        return new OpenAPI()
            .info(new Info()
                .title("Projeto Accenture")
                .version("1.0.0")
                .description("Projeto Desafio Accenture"))
            .servers(List.of(
                new Server().url("/").description("Current server")
            ));
    }
}