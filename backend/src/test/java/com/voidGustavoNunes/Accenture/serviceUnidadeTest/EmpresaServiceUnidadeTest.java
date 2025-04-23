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
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.voidGustavoNunes.Accenture.exception.RegistroNotFoundException;
import com.voidGustavoNunes.Accenture.model.Empresa;
import com.voidGustavoNunes.Accenture.model.Fornecedor;
import com.voidGustavoNunes.Accenture.model.enums.TipoPessoa;
import com.voidGustavoNunes.Accenture.repository.EmpresaRepository;
import com.voidGustavoNunes.Accenture.repository.FornecedorRepository;
import com.voidGustavoNunes.Accenture.service.CepService;
import com.voidGustavoNunes.Accenture.service.EmpresaService;

@ExtendWith(MockitoExtension.class)
public class EmpresaServiceUnidadeTest {
    @Mock
    private EmpresaRepository empresaRepository;
    
    @Mock
    private FornecedorRepository fornecedorRepository;
    
    @Mock
    private CepService cepService;
    
    @InjectMocks
    private EmpresaService empresaService;
    
    private Empresa empresa;
    private Fornecedor fornecedor;
    
    @BeforeEach
    public void setup() {
        empresa = new Empresa();
        empresa.setId(1L);
        empresa.setCnpj("12345678901234");
        empresa.setNomeFantasia("Empresa Teste");
        empresa.setCep("12345678");
        
        fornecedor = new Fornecedor();
        fornecedor.setId(1L);
        fornecedor.setNome("Fornecedor Teste");
        fornecedor.setEmail("teste@fornecedor.com");
        fornecedor.setIdentificador("12345678901");
        fornecedor.setTipo(TipoPessoa.FISICA);
        fornecedor.setCep("12345678");
        fornecedor.setRg("123456");
        fornecedor.setDataNascimento(LocalDate.of(1990, 1, 1));
    }
    
    @Test
    public void testListar() {
        List<Empresa> empresas = Arrays.asList(empresa);
        when(empresaRepository.findAllActive()).thenReturn(empresas);
        
        List<Empresa> result = empresaService.listar();
        
        assertEquals(1, result.size());
        assertEquals(empresa.getId(), result.get(0).getId());
        assertEquals(empresa.getCnpj(), result.get(0).getCnpj());
        
        verify(empresaRepository).findAllActive();
    }
    
    @Test
    public void testBuscarPorId_Success() {
        when(empresaRepository.findById(1L)).thenReturn(Optional.of(empresa));
        
        Empresa result = empresaService.buscarPorId(1L);
        
        assertNotNull(result);
        assertEquals(empresa.getId(), result.getId());
        
        verify(empresaRepository).findById(1L);
    }
    
    @Test
    public void testBuscarPorId_NotFound() {
        when(empresaRepository.findById(999L)).thenReturn(Optional.empty());
        
        assertThrows(RegistroNotFoundException.class, () -> {
            empresaService.buscarPorId(999L);
        });
        
        verify(empresaRepository).findById(999L);
    }
    
    @Test
    public void testAssociarFornecedor() {
        when(empresaRepository.findById(1L)).thenReturn(Optional.of(empresa));
        when(fornecedorRepository.findById(1L)).thenReturn(Optional.of(fornecedor));
        when(empresaRepository.save(any(Empresa.class))).thenReturn(empresa);
        
        Empresa result = empresaService.associarFornecedor(1L, 1L);
        
        assertNotNull(result);
        
        ArgumentCaptor<Empresa> empresaCaptor = ArgumentCaptor.forClass(Empresa.class);
        verify(empresaRepository).save(empresaCaptor.capture());
        
        Empresa empresaSalva = empresaCaptor.getValue();
        assertTrue(empresaSalva.getFornecedores().contains(fornecedor));
        
        verify(empresaRepository).findById(1L);
        verify(fornecedorRepository).findById(1L);
    }
    
    @Test
    public void testRemoverFornecedor() {
        empresa.addFornecedor(fornecedor);
        
        when(empresaRepository.findById(1L)).thenReturn(Optional.of(empresa));
        when(fornecedorRepository.findById(1L)).thenReturn(Optional.of(fornecedor));
        when(empresaRepository.save(any(Empresa.class))).thenReturn(empresa);
        
        Empresa result = empresaService.removerFornecedor(1L, 1L);
        
        assertNotNull(result);
        
        ArgumentCaptor<Empresa> empresaCaptor = ArgumentCaptor.forClass(Empresa.class);
        verify(empresaRepository).save(empresaCaptor.capture());
        
        Empresa empresaSalva = empresaCaptor.getValue();
        assertFalse(empresaSalva.getFornecedores().contains(fornecedor));
        
        verify(empresaRepository).findById(1L);
        verify(fornecedorRepository).findById(1L);
    }
}
