package com.voidGustavoNunes.Accenture.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.voidGustavoNunes.Accenture.model.Fornecedor;
import com.voidGustavoNunes.Accenture.model.dto.FornecedorDTO;
import com.voidGustavoNunes.Accenture.service.FornecedorService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Validated
@RestController
@RequestMapping("/api/fornecedor")
@Tag(name = "Fornecedores", description = "Operações relacionadas aos Fornecedores")
public class FornecedorController extends GenericController<Fornecedor, FornecedorDTO> {

    protected FornecedorController(FornecedorService genericService) {
        super(genericService);
    }

    @Override
    protected FornecedorDTO toDTO(Fornecedor entity) {
        return new FornecedorDTO(entity);
    }

    @Override
    protected Fornecedor toEntity(FornecedorDTO dto) {
        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setId(dto.getId());
        fornecedor.setNome(dto.getNome());
        fornecedor.setEmail(dto.getEmail());
        fornecedor.setCep(dto.getCep());
        fornecedor.setIdentificador(dto.getIdentificador());
        fornecedor.setTipo(dto.getTipo());
        return fornecedor;
    }
}