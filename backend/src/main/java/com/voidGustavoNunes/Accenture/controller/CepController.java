package com.voidGustavoNunes.Accenture.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.voidGustavoNunes.Accenture.model.dto.CepDTO;
import com.voidGustavoNunes.Accenture.service.CepService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/cep")
public class CepController {
    @Autowired
    private CepService cepService;

    @Operation(summary = "Lista", description = "Método que valida cep atraves de uma api externa")
    @GetMapping("/{cep}")
    public ResponseEntity<?> validateCep(@PathVariable String cep) {
        CepDTO response = cepService.validaCep(cep);
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body("CEP invalido");
        }
    }
}
