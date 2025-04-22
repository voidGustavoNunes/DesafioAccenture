package com.voidGustavoNunes.Accenture.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.voidGustavoNunes.Accenture.model.Empresa;
import com.voidGustavoNunes.Accenture.model.dto.EmpresaDTO;
import com.voidGustavoNunes.Accenture.service.EmpresaService;

import io.swagger.v3.oas.annotations.tags.Tag;
@Validated
@RestController
@RequestMapping("/api/empresa")
@Tag(name = "Empresas", description = "Operações relacionadas às empresas")
public class EmpresaController extends GenericController<Empresa, EmpresaDTO> {

    @Autowired
    private EmpresaService empresaService;

    protected EmpresaController(EmpresaService genericService) {
        super(genericService);
    }

    @Override
    protected EmpresaDTO toDTO(Empresa entity) {
        return new EmpresaDTO(entity);
    }

    @Override
    protected Empresa toEntity(EmpresaDTO dto) {
        Empresa empresa;
    
        if (dto.getId() == null) {
            empresa = new Empresa();
        } else {
            empresa = empresaService.buscarPorId(dto.getId());
        }
    
        empresa.setCnpj(dto.getCnpj());
        empresa.setNomeFantasia(dto.getNomeFantasia());
        empresa.setCep(dto.getCep());
    
        return empresa;
    }

    @PostMapping("/{empresaId}/fornecedores/{fornecedorId}")
    public EmpresaDTO associarFornecedor(@PathVariable Long empresaId, @PathVariable Long fornecedorId) {
        return toDTO(empresaService.associarFornecedor(empresaId, fornecedorId));
    }
    
    @DeleteMapping("/{empresaId}/fornecedores/{fornecedorId}")
    public EmpresaDTO removerFornecedor(@PathVariable Long empresaId, @PathVariable Long fornecedorId) {
        return toDTO(empresaService.removerFornecedor(empresaId, fornecedorId));
    }
}