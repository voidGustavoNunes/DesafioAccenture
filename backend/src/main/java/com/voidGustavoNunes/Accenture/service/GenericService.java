package com.voidGustavoNunes.Accenture.service;

import java.util.List;

import com.voidGustavoNunes.Accenture.exception.RegistroNotFoundException;

import jakarta.validation.constraints.NotNull;

public interface GenericService<T> {

    List<T> listar();

    T buscarPorId(@NotNull Long id);

    T criar( @NotNull T entity);

    T atualizar(@NotNull Long id, @NotNull T entity);

    void excluir(@NotNull Long id);
    
    public abstract void saveValidation(T entity) throws RegistroNotFoundException;
    
}
