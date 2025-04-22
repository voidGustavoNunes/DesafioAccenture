package com.voidGustavoNunes.Accenture.model.dto;

import com.voidGustavoNunes.Accenture.model.Fornecedor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FornecedorResumoDTO {
    private Long id;
    private String nome;
    private String email;
    private String cep;
    private String identificador;

    public FornecedorResumoDTO(Fornecedor fornecedor) {
        this.id = fornecedor.getId();
        this.nome = fornecedor.getNome();
        this.email = fornecedor.getEmail();
        this.cep = fornecedor.getCep();
        this.identificador = fornecedor.getIdentificador();
    }
}