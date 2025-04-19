package com.voidGustavoNunes.Accenture.exception;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class RegistroNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public RegistroNotFoundException(@NotNull @Positive Long id) {
        super("Registro não encontrado com o id: " + id);
    }

    public RegistroNotFoundException() {
        super("Registro não encontrado");
    }

    public RegistroNotFoundException(String message) {
        super(message);
    }
}
