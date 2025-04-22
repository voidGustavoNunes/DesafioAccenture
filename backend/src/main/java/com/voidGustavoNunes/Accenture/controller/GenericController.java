package com.voidGustavoNunes.Accenture.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.voidGustavoNunes.Accenture.service.GenericService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
public abstract class GenericController<T, D> {
    private final GenericService<T> genericService;

    protected GenericController(GenericService<T> genericService) {
        this.genericService = genericService;
    }

    protected abstract D toDTO(T entity);
    protected abstract T toEntity(D dto);

    @Operation(summary = "Lista", description = "Método que gera uma lista de entidades cadastradas")
    @GetMapping
    public List<D> listar() {
        return genericService.listar().stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    @Operation(summary = "Busca por ID", description = "Método que efetua uma busca por ID no banco de dados")
    @GetMapping("/{id}")
    public D buscarPorId(@PathVariable @NotNull Long id) {
        return toDTO(genericService.buscarPorId(id));
    }

    @Operation(summary = "Criar", description = "Método que cria uma entidade e persiste no banco de dados")
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public D criar(@RequestBody @Valid D dto) {
        return toDTO(genericService.criar(toEntity(dto)));
    }

    @Operation(summary = "Atualizar", description = "Método que atualiza uma entidade e a persiste no banco de dados")
    @PutMapping("/{id}")
    public D atualizar(@PathVariable @NotNull Long id, @RequestBody @Valid D dto) {
        return toDTO(genericService.atualizar(id, toEntity(dto)));
    }

    @Operation(summary = "Excluir", description = "Método que exclui permanentemente uma entidade")
    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable @NotNull @Positive Long id) {
        genericService.excluir(id);
    }
}