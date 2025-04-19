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
    
    @Query("SELECT e FROM Empresa e WHERE e.id = :id AND e.deleted = false")
    Optional<Empresa> findByIdActive(@Param("id") Long id);
    
    boolean existsByCnpj(String cnpj);
    
    @Query("SELECT e FROM Empresa e WHERE e.cnpj = :cnpj AND e.deleted = false")
    Optional<Empresa> findByCnpjActive(@Param("cnpj") String cnpj);
    
    @Query("SELECT CASE WHEN COUNT(e) > 0 THEN true ELSE false END FROM Empresa e WHERE e.cnpj = :cnpj AND e.deleted = false")
    boolean existsByCnpjActive(@Param("cnpj") String cnpj);
    
}
