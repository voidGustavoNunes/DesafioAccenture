package com.voidGustavoNunes.Accenture.model.dto;

import com.voidGustavoNunes.Accenture.model.Empresa;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpresaResumoDTO {
    private Long id;
    private String cnpj;
    private String nomeFantasia;
    private String cep;

    public EmpresaResumoDTO(Empresa empresa){
        this.id = empresa.getId();
        this.cnpj = empresa.getCnpj();
        this.nomeFantasia = empresa.getNomeFantasia();
        this.cep = empresa.getCep();
    }
}
