package com.voidGustavoNunes.Accenture.serviceUnidadeTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.voidGustavoNunes.Accenture.exception.RegistroNotFoundException;
import com.voidGustavoNunes.Accenture.model.Fornecedor;
import com.voidGustavoNunes.Accenture.model.dto.CepDTO;
import com.voidGustavoNunes.Accenture.model.enums.TipoPessoa;
import com.voidGustavoNunes.Accenture.repository.FornecedorRepository;
import com.voidGustavoNunes.Accenture.service.CepService;
import com.voidGustavoNunes.Accenture.service.FornecedorService;

@ExtendWith(MockitoExtension.class)
public class FornecedorServiceUnidadeTest {
    @Mock
    private FornecedorRepository fornecedorRepository;
    
    @Mock
    private CepService cepService;
    
    @InjectMocks
    private FornecedorService fornecedorService;
    
    private Fornecedor fornecedorPF;
    private Fornecedor fornecedorPJ;
    private CepDTO cepDTO;
    
    @BeforeEach
    public void setup() {
        fornecedorPF = new Fornecedor();
        fornecedorPF.setId(1L);
        fornecedorPF.setNome("Fornecedor PF");
        fornecedorPF.setEmail("pf@teste.com");
        fornecedorPF.setIdentificador("12345678901"); 
        fornecedorPF.setTipo(TipoPessoa.FISICA);
        fornecedorPF.setCep("12345678");
        fornecedorPF.setRg("123456");
        fornecedorPF.setDataNascimento(LocalDate.of(1990, 1, 1));
        
        fornecedorPJ = new Fornecedor();
        fornecedorPJ.setId(2L);
        fornecedorPJ.setNome("Fornecedor PJ");
        fornecedorPJ.setEmail("pj@teste.com");
        fornecedorPJ.setIdentificador("12345678901234"); 
        fornecedorPJ.setTipo(TipoPessoa.JURIDICA);
        fornecedorPJ.setCep("12345678");
        
        cepDTO = new CepDTO();
        cepDTO.setCep("12345-678");
        cepDTO.setLocalidade("São Paulo");
        cepDTO.setUf("SP");
    }
    
    @Test
    public void testListar() {
        List<Fornecedor> fornecedores = Arrays.asList(fornecedorPF, fornecedorPJ);
        when(fornecedorRepository.findAllActive()).thenReturn(fornecedores);
        
        List<Fornecedor> result = fornecedorService.listar();
        
        assertEquals(2, result.size());
        
        verify(fornecedorRepository).findAllActive();
    }
    
    @Test
    public void testValidarCamposObrigatoriosPessoaFisica_Success() {
        when(cepService.validaCep(anyString())).thenReturn(cepDTO);
        when(fornecedorRepository.findByIdentificadorLimpo(anyString())).thenReturn(Optional.empty());
        assertDoesNotThrow(() -> {
            fornecedorService.saveValidation(fornecedorPF);
        });
    }
    
    @Test
    public void testValidarCamposObrigatoriosPessoaFisica_MissingRG() {
        fornecedorPF.setRg(null);
        when(cepService.validaCep(anyString())).thenReturn(cepDTO);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            fornecedorService.saveValidation(fornecedorPF);
        });
        
        assertTrue(exception.getMessage().contains("RG é obrigatório para pessoa física"));
    }
    
    @Test
    public void testValidarCamposObrigatoriosPessoaFisica_MissingDataNascimento() {
        fornecedorPF.setDataNascimento(null);
        when(cepService.validaCep(anyString())).thenReturn(cepDTO);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            fornecedorService.saveValidation(fornecedorPF);
        });
        
        assertTrue(exception.getMessage().contains("Data de nascimento é obrigatória para pessoa física"));
    }
    
    @Test
    public void testValidarMenorDeIdadeParana() {
        fornecedorPF.setDataNascimento(LocalDate.now().minusYears(17));
        
        CepDTO cepParana = new CepDTO();
        cepParana.setCep("87000-000");
        cepParana.setLocalidade("Maringá");
        cepParana.setUf("PR");
        
        when(cepService.validaCep(anyString())).thenReturn(cepParana);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            fornecedorService.saveValidation(fornecedorPF);
        });
        
        assertTrue(exception.getMessage().contains("Não é permitido cadastrar fornecedor pessoa física menor de idade no Paraná"));
    }
    
    @Test
    public void testBuscarPorId_NotFound() {
        when(fornecedorRepository.findById(999L)).thenReturn(Optional.empty());
        
        assertThrows(RegistroNotFoundException.class, () -> {
            fornecedorService.buscarPorId(999L);
        });
        
        verify(fornecedorRepository).findById(999L);
    }
}
