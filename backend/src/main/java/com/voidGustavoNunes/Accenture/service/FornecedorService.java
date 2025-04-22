package com.voidGustavoNunes.Accenture.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.voidGustavoNunes.Accenture.exception.RegistroNotFoundException;
import com.voidGustavoNunes.Accenture.model.Fornecedor;
import com.voidGustavoNunes.Accenture.model.enums.TipoPessoa;
import com.voidGustavoNunes.Accenture.repository.FornecedorRepository;

import br.com.caelum.stella.validation.CNPJValidator;
import br.com.caelum.stella.validation.CPFValidator;
import br.com.caelum.stella.validation.InvalidStateException;

@Service
public class FornecedorService extends GenericServiceImpl<Fornecedor, FornecedorRepository>{

    @Autowired
    private CepService cepService;

    protected FornecedorService(FornecedorRepository repository) {
        super(repository);
    }

    @Override
    public void saveValidation(Fornecedor entity) throws RegistroNotFoundException {
        validarCep(entity.getCep());
        validarIdentificador(entity.getIdentificador(), entity.getTipo());
    }

    private void validarCep(String cep) {
        cepService.validaCep(cep);
    }

    private void validarIdentificador(String identificador, TipoPessoa tipo) {
        String somenteNumeros = identificador.replaceAll("[^\\d]", "");

        try {
            if (tipo == TipoPessoa.FISICA) {
                new CPFValidator().assertValid(somenteNumeros);
            } else if (tipo == TipoPessoa.JURIDICA) {
                new CNPJValidator().assertValid(somenteNumeros);
            } else {
                throw new IllegalArgumentException("Tipo de pessoa inválido");
            }
        } catch (InvalidStateException e) {
            throw new IllegalArgumentException((tipo == TipoPessoa.FISICA ? "CPF" : "CNPJ") + " inválido: " + identificador);
        }
    }
    
}
