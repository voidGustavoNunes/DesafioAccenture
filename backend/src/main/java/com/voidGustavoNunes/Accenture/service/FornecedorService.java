package com.voidGustavoNunes.Accenture.service;

import org.springframework.stereotype.Service;

import com.voidGustavoNunes.Accenture.exception.RegistroNotFoundException;
import com.voidGustavoNunes.Accenture.model.Fornecedor;
import com.voidGustavoNunes.Accenture.repository.FornecedorRepository;

@Service
public class FornecedorService extends GenericServiceImpl<Fornecedor, FornecedorRepository>{

    protected FornecedorService(FornecedorRepository repository) {
        super(repository);
        //TODO Auto-generated constructor stub
    }

    @Override
    public void saveValidation(Fornecedor entity) throws RegistroNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'saveValidation'");
    }
    
}
