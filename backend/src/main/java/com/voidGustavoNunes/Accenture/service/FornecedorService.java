package com.voidGustavoNunes.Accenture.service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.voidGustavoNunes.Accenture.exception.RegistroNotFoundException;
import com.voidGustavoNunes.Accenture.model.Empresa;
import com.voidGustavoNunes.Accenture.model.Fornecedor;
import com.voidGustavoNunes.Accenture.model.dto.CepDTO;
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
        validarDuplicidade(entity);
        validarCamposObrigatoriosPessoaFisica(entity);
        validarMenorDeIdadeParana(entity);
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

    @Override
    public List<Fornecedor> listar() {
        return repository.findAllActive().stream()
            .peek(fornecedor -> {
                if ((fornecedor.getEmpresas()) != null) {
                    fornecedor.getEmpresas().size();
                }
            })
            .collect(Collectors.toList());
    }
    
    private void validarDuplicidade(Fornecedor entity) {
        String identificadorLimpo = entity.getIdentificador().replaceAll("[^\\d]", "");
        
        Optional<Fornecedor> fornecedorExistente = repository.findByIdentificadorLimpo(identificadorLimpo);
        
        if (fornecedorExistente.isPresent() && !fornecedorExistente.get().getId().equals(entity.getId())) {
            throw new IllegalArgumentException("Já existe um fornecedor cadastrado com este " + 
                (entity.getTipo() == TipoPessoa.FISICA ? "CPF" : "CNPJ"));
        }
    }

    private void validarCamposObrigatoriosPessoaFisica(Fornecedor entity) {
        if (entity.getTipo() == TipoPessoa.FISICA) {
            if (entity.getRg() == null || entity.getRg().trim().isEmpty()) {
                throw new IllegalArgumentException("RG é obrigatório para pessoa física");
            }
            
            if (entity.getDataNascimento() == null) {
                throw new IllegalArgumentException("Data de nascimento é obrigatória para pessoa física");
            }
        }
    }
    
    private void validarMenorDeIdadeParana(Fornecedor entity) {
        if (entity.getTipo() == TipoPessoa.FISICA && entity.getDataNascimento() != null) {
            CepDTO cepDTO = cepService.validaCep(entity.getCep());
            if (cepDTO != null && "PR".equalsIgnoreCase(cepDTO.getUf())) {
                LocalDate hoje = LocalDate.now();
                LocalDate dataNascimento = entity.getDataNascimento();
                
                Period periodo = Period.between(dataNascimento, hoje);
                if (periodo.getYears() < 18) {
                    throw new IllegalArgumentException("Não é permitido cadastrar fornecedor pessoa física menor de idade no Paraná");
                }
            }
        }
    }
}
