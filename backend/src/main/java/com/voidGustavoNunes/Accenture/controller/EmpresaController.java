package com.voidGustavoNunes.Accenture.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.voidGustavoNunes.Accenture.service.EmpresaService;
import com.voidGustavoNunes.Accenture.service.GenericService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Validated
@RestController
@RequestMapping("/api/empresa")
@Tag(name = "Empresas", description = "Operações relacionadas às empresas")
public class EmpresaController extends GenericController<Long>{

    @Autowired
    private EmpresaService service;

    protected EmpresaController(GenericService<Long> genericService) {
        super(genericService);
        //TODO Auto-generated constructor stub
    }
    
}
