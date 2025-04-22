package com.voidGustavoNunes.Accenture.model.dto;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.voidGustavoNunes.Accenture.model.Empresa;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpresaDTO {
    private Long id;
    
    @NotBlank(message = "CNPJ é obrigatório")
    @Pattern(regexp = "\\d{14}", message = "CNPJ deve conter 14 dígitos numéricos")
    private String cnpj;
    
    @NotBlank(message = "Nome fantasia é obrigatório")
    private String nomeFantasia;
    
    @NotBlank(message = "CEP é obrigatório")
    @Pattern(regexp = "\\d{8}", message = "CEP deve conter 8 dígitos numéricos")
    private String cep;
    
    private List<FornecedorResumoDTO> fornecedores;

    public EmpresaDTO(Empresa empresa) {
        this.id = empresa.getId();
        this.cnpj = empresa.getCnpj();
        this.nomeFantasia = empresa.getNomeFantasia();
        this.cep = empresa.getCep();
        this.fornecedores = empresa.getFornecedores() != null ? 
            empresa.getFornecedores().stream()
                .map(FornecedorResumoDTO::new)
                .collect(Collectors.toList()) : 
            Collections.emptyList();
    }
}