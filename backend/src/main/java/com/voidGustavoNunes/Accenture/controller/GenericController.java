package com.voidGustavoNunes.Accenture.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.voidGustavoNunes.Accenture.service.GenericService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("")
public abstract class GenericController<T> {
    private final GenericService<T> genericService;


    public GenericService<T> getGenericService() {
        return genericService;
    }

    protected GenericController(GenericService<T> genericService) {
        this.genericService = genericService;
    }

    @Operation(summary = "Lista", description = "Método que gera uma lista de entidades cadastradas")
    @GetMapping
    public List<T> listar() {
        return genericService.listar();
    }

    @Operation(summary = "Busca por ID", description = "Método que efetua uma busca por ID no banco de dados")
    @GetMapping("/{id}")
    public T buscarPorId(@PathVariable @NotNull Long id) {
        return genericService.buscarPorId(id);
    }

    @Operation(summary = "Criar", description = "Método que cria uma entidade e persiste no banco de dados")
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public T criar(@RequestBody @NotNull T entity) {
        return genericService.criar(entity);
    }

    @Operation(summary = "Atualizar", description = "Método que atualiza uma entidade e a persiste no banco de dados")
    @PutMapping("/{id}")
    public T atualizar(@PathVariable @NotNull Long id, @RequestBody @NotNull T entity) {
        return genericService.atualizar(id, entity);
    }

    @Operation(summary = "Excluir", description = "Método que exclui pernamentemente uma entidade")
    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable @NotNull @Positive Long id) {
        genericService.excluir(id);
    }
}
