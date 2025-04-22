package com.voidGustavoNunes.Accenture.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.voidGustavoNunes.Accenture.model.dto.CepDTO;

@Service
public class CepService {
    private final RestTemplate restTemplate = new RestTemplate();
    
    public CepDTO validaCep(String cep) {
        try {
            String cepSemMascara = cep.replaceAll("[^\\d]", "");
            String url = "https://viacep.com.br/ws/" + cepSemMascara + "/json/";
            CepDTO response = restTemplate.getForObject(url, CepDTO.class);
    
            if (response == null || response.getCep() == null) {
                throw new IllegalArgumentException("CEP inválido ou não encontrado: " + cep);
            }
    
            return response;
    
        } catch (RestClientException e) {
            throw new IllegalArgumentException("Erro ao consultar o CEP: " + cep);
        }
    }


}
