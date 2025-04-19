package com.voidGustavoNunes.Accenture.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.voidGustavoNunes.Accenture.service.GenericService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Validated
@RestController
@RequestMapping("/api/fornecedor")
@Tag(name = "Fornecedores", description = "Operações relacionadas aos Fornecedores")
public class FornecedorController extends GenericController<Long> {

    protected FornecedorController(GenericService<Long> genericService) {
        super(genericService);
        // TODO Auto-generated constructor stub
    }
    
}
