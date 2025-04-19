package com.voidGustavoNunes.Accenture.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.voidGustavoNunes.Accenture.exception.RegistroNotFoundException;

import jakarta.validation.constraints.NotNull;

import java.lang.reflect.Field;

public abstract class GenericServiceImpl<T, R extends JpaRepository<T, Long>> implements GenericService<T> {

    protected R repository;

    protected GenericServiceImpl(R repository) {
        this.repository = repository;
    }

    @Override
    public List<T> listar() {
        return repository.findAll();
    }

    @Override
    public T buscarPorId(@NotNull Long id) {
        return repository.findById(id).orElseThrow(() -> new RegistroNotFoundException(id));
    }

    @Override
    public T criar(@NotNull T entity) {
        this.saveValidation(entity);
        return repository.save(entity);
    }

    @Override
    public void excluir(@NotNull Long id) {
        repository.delete(this.repository.findById(id).orElseThrow(() -> new RegistroNotFoundException(id)));
    }

    @Override
    public T atualizar(@NotNull Long id, @NotNull T entityAtualizada) {
        this.saveValidation(entityAtualizada);
        T entityExistente = repository.findById(id)
                .orElseThrow(() -> new RegistroNotFoundException(id));
        
        if (entityExistente != null) {
            try {
                Class<?> clazz = entityExistente.getClass();
                Field[] fields = clazz.getDeclaredFields();
                for (Field field : fields) {
                    field.setAccessible(true);
                    Object value = field.get(entityAtualizada);
                    if (value != null) {
                        field.set(entityExistente, value);
                    }
                }
                return repository.save(entityExistente);
            } catch (IllegalAccessException e) {
                throw new RuntimeException("Erro ao atualizar a entidade: " + e.getMessage());
            }
        } else {
            throw new RegistroNotFoundException(id);
        }
    }



}
