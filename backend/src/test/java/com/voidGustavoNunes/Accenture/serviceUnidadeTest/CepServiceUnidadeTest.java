package com.voidGustavoNunes.Accenture.serviceUnidadeTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.voidGustavoNunes.Accenture.model.dto.CepDTO;
import com.voidGustavoNunes.Accenture.service.CepService;

@ExtendWith(MockitoExtension.class)
public class CepServiceUnidadeTest {
    @InjectMocks
    private CepService cepService;
    
    @Mock
    private RestTemplate restTemplate;
    
    @Test
    public void testValidaCep_Success() {
        String cep = "12345678";
        CepDTO expectedResponse = new CepDTO();
        expectedResponse.setCep("12345-678");
        expectedResponse.setLocalidade("São Paulo");
        expectedResponse.setUf("SP");
        
        try {
            java.lang.reflect.Field field = CepService.class.getDeclaredField("restTemplate");
            field.setAccessible(true);
            field.set(cepService, restTemplate);
        } catch (Exception e) {
            fail("Failed to set mock RestTemplate");
        }
        
        when(restTemplate.getForObject(anyString(), eq(CepDTO.class))).thenReturn(expectedResponse);
        
        CepDTO result = cepService.validaCep(cep);
        
        assertNotNull(result);
        assertEquals("12345-678", result.getCep());
        assertEquals("São Paulo", result.getLocalidade());
        assertEquals("SP", result.getUf());
        
        verify(restTemplate).getForObject(contains(cep), eq(CepDTO.class));
    }
    
    @Test
    public void testValidaCep_InvalidCep() {
        String cep = "12345678";
        
        try {
            java.lang.reflect.Field field = CepService.class.getDeclaredField("restTemplate");
            field.setAccessible(true);
            field.set(cepService, restTemplate);
        } catch (Exception e) {
            fail("Failed to set mock RestTemplate");
        }
        
        when(restTemplate.getForObject(anyString(), eq(CepDTO.class))).thenReturn(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            cepService.validaCep(cep);
        });
        
        assertTrue(exception.getMessage().contains("CEP inválido ou não encontrado"));
    }
    
    @Test
    public void testValidaCep_ApiError() {
        String cep = "12345678";
        
        try {
            java.lang.reflect.Field field = CepService.class.getDeclaredField("restTemplate");
            field.setAccessible(true);
            field.set(cepService, restTemplate);
        } catch (Exception e) {
            fail("Failed to set mock RestTemplate");
        }
        
        when(restTemplate.getForObject(anyString(), eq(CepDTO.class)))
            .thenThrow(new RestClientException("API Error"));
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            cepService.validaCep(cep);
        });
        
        assertTrue(exception.getMessage().contains("Erro ao consultar o CEP"));
    }
}
