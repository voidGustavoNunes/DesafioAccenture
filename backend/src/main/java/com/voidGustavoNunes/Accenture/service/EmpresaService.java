package com.voidGustavoNunes.Accenture.service;

import org.springframework.stereotype.Service;

import com.voidGustavoNunes.Accenture.exception.RegistroNotFoundException;
import com.voidGustavoNunes.Accenture.model.Empresa;
import com.voidGustavoNunes.Accenture.repository.EmpresaRepository;

@Service
public class EmpresaService extends GenericServiceImpl<Empresa, EmpresaRepository>{

    protected EmpresaService(EmpresaRepository repository) {
        super(repository);
        //TODO Auto-generated constructor stub
    }

    @Override
    public void saveValidation(Empresa entity) throws RegistroNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'saveValidation'");
    }
    
}
