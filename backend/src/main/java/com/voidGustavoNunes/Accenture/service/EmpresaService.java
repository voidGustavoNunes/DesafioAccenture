package com.voidGustavoNunes.Accenture.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.voidGustavoNunes.Accenture.exception.RegistroNotFoundException;
import com.voidGustavoNunes.Accenture.model.Empresa;
import com.voidGustavoNunes.Accenture.model.Fornecedor;
import com.voidGustavoNunes.Accenture.repository.EmpresaRepository;
import com.voidGustavoNunes.Accenture.repository.FornecedorRepository;

import br.com.caelum.stella.validation.CNPJValidator;
import br.com.caelum.stella.validation.InvalidStateException;

@Service
public class EmpresaService extends GenericServiceImpl<Empresa, EmpresaRepository>{

    @Autowired
    private CepService cepService;

    @Autowired
    private FornecedorRepository fornecedorRepository;

    protected EmpresaService(EmpresaRepository repository) {
        super(repository);

    }

    @Override
    public void saveValidation(Empresa entity) throws RegistroNotFoundException {
        cepService.validaCep(entity.getCep());
        validarCnpj(entity.getCnpj());
    }

    private void validarCnpj(String cnpj) {
        String cnpjNumerico = cnpj.replaceAll("[^\\d]", "");
        try {
            new CNPJValidator().assertValid(cnpjNumerico);
        } catch (InvalidStateException e) {
            throw new IllegalArgumentException("CNPJ inválido: " + cnpj);
        }
    }

    @Override
    public List<Empresa> listar() {
        return repository.findAllActive().stream()
            .peek(empresa -> {
                if (empresa.getFornecedores() != null) {
                    empresa.getFornecedores().size();
                }
            })
            .collect(Collectors.toList());
    }
    
    @Transactional
    public Empresa associarFornecedor(Long empresaId, Long fornecedorId) {
        Empresa empresa = repository.findById(empresaId)
                .orElseThrow(() -> new RegistroNotFoundException(empresaId));
        
        Fornecedor fornecedor = fornecedorRepository.findById(fornecedorId)
                .orElseThrow(() -> new RegistroNotFoundException(fornecedorId));
        
        empresa.addFornecedor(fornecedor);
        return repository.save(empresa);
    }
    
    @Transactional
    public Empresa removerFornecedor(Long empresaId, Long fornecedorId) {
        Empresa empresa = repository.findById(empresaId)
                .orElseThrow(() -> new RegistroNotFoundException(empresaId));
        
        Fornecedor fornecedor = fornecedorRepository.findById(fornecedorId)
                .orElseThrow(() -> new RegistroNotFoundException(fornecedorId));
        
        empresa.removeFornecedor(fornecedor);
        return repository.save(empresa);
    }
}
