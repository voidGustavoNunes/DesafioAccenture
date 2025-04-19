package com.voidGustavoNunes.Accenture.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.voidGustavoNunes.Accenture.model.enums.TipoPessoa;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Fornecedor extends GenericModel{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Tipo é obrigatório")
    @Enumerated(EnumType.STRING)
    private TipoPessoa tipo;
    
    //cpf ou cnpj
    @NotBlank(message = "Identificador é obrigatório")
    @Column(unique = true)
    private String identificador;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    private String email;
    
    @NotBlank(message = "CEP é obrigatório")
    @Pattern(regexp = "\\d{8}", message = "O CEP deve conter 8 dígitos numéricos")
    private String cep;
    
    private String rg;
    
    private LocalDate dataNascimento;
    
    @ManyToMany(mappedBy = "fornecedores")
    private Set<Empresa> empresas = new HashSet<>();
    
    
}
