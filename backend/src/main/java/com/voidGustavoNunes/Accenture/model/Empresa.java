package com.voidGustavoNunes.Accenture.model;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Empresa extends GenericModel{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "CNPJ é obrigatório")
    @Pattern(regexp = "\\d{14}", message = "CNPJ deve conter 14 dígitos numéricos")
    @Column(unique = true)
    private String cnpj;
    
    @NotBlank(message = "Nome fantasia é obrigatório")
    private String nomeFantasia;
    
    @NotBlank(message = "CEP é obrigatório")
    @Pattern(regexp = "\\d{8}", message = "CEP deve conter 8 dígitos numéricos")
    private String cep;
    
    @ManyToMany
    @JoinTable(
        name = "empresa_fornecedor",
        joinColumns = @JoinColumn(name = "empresa_id"),
        inverseJoinColumns = @JoinColumn(name = "fornecedor_id")
    )
    private Set<Fornecedor> fornecedores = new HashSet<>();
    
    public void addFornecedor(Fornecedor fornecedor) {
        this.fornecedores.add(fornecedor);
        fornecedor.getEmpresas().add(this);
    }
    
    public void removeFornecedor(Fornecedor fornecedor) {
        this.fornecedores.remove(fornecedor);
        fornecedor.getEmpresas().remove(this);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Empresa empresa = (Empresa) o;
        return Objects.equals(id, empresa.id);
    }
}
