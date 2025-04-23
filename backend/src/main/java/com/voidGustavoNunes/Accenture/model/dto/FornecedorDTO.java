package com.voidGustavoNunes.Accenture.model.dto;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.voidGustavoNunes.Accenture.model.Fornecedor;
import com.voidGustavoNunes.Accenture.model.enums.TipoPessoa;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FornecedorDTO {
    private Long id;
    
    @NotBlank(message = "Tipo é obrigatório")
    private TipoPessoa tipo;
    
    @NotBlank(message = "Identificador é obrigatório")
    private String identificador;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    private String email;
    
    @NotBlank(message = "CEP é obrigatório")
    @Pattern(regexp = "\\d{8}", message = "O CEP deve conter 8 dígitos numéricos")
    private String cep;
        
    private List<EmpresaResumoDTO> empresas;

    private String rg;
    
    private LocalDate dataNascimento;


    public FornecedorDTO(Fornecedor fornecedor) {
        this.id = fornecedor.getId();
        this.tipo = fornecedor.getTipo();
        this.identificador = fornecedor.getIdentificador();
        this.nome = fornecedor.getNome();
        this.email = fornecedor.getEmail();
        this.cep = fornecedor.getCep();
        this.rg = fornecedor.getRg();
        this.dataNascimento = fornecedor.getDataNascimento();
        this.empresas = fornecedor.getEmpresas() != null ? 
        fornecedor.getEmpresas().stream()
            .map(EmpresaResumoDTO::new)
            .collect(Collectors.toList()) : 
        Collections.emptyList();
    }
}
