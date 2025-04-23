package com.voidGustavoNunes.Accenture.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.voidGustavoNunes.Accenture.model.Empresa;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long>{

    @Query("SELECT e FROM Empresa e WHERE e.deleted = false")
    List<Empresa> findAllActive();

    @Query("SELECT e FROM Empresa e WHERE REPLACE(e.cnpj, '-', '') = :cnpjLimpo")
    Optional<Empresa> findByCnpjLimpo(@Param("cnpjLimpo") String cnpjLimpo);
    
}
