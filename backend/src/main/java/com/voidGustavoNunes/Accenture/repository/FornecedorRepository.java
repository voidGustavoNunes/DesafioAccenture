package com.voidGustavoNunes.Accenture.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.voidGustavoNunes.Accenture.model.Fornecedor;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long>{
    @Query("SELECT f FROM Fornecedor f WHERE f.deleted = false")
    List<Fornecedor> findAllActive();

    @Query("SELECT f FROM Fornecedor f WHERE " +
    "REPLACE(REPLACE(REPLACE(REPLACE(f.identificador, '.', ''), '/', ''), '-', ''), ' ', '') = :identificadorLimpo")
    Optional<Fornecedor> findByIdentificadorLimpo(@Param("identificadorLimpo") String identificadorLimpo);
}
