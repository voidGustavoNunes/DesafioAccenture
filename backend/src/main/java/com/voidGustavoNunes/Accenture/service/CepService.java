package com.voidGustavoNunes.Accenture.service;

import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.voidGustavoNunes.Accenture.model.dto.CepDTO;

public class CepService {
    private final RestTemplate restTemplate = new RestTemplate();
    private static final String CEP_API_URL = "http://cep.la/";
    
    public CepDTO validateCep(String cep) {
        try {
            return restTemplate.getForObject(CEP_API_URL + cep, CepDTO.class);
        } catch (RestClientException e) {
            return null; 
        }
    }
}
