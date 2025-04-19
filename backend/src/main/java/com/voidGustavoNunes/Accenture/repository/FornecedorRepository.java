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
    
    @Query("SELECT f FROM Fornecedor f WHERE f.id = :id AND f.deleted = false")
    Optional<Fornecedor> findByIdActive(@Param("id") Long id);
    
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM Fornecedor f WHERE f.identificador = :identificador AND f.deleted = false")
    boolean existsByIdentificadorActive(@Param("identificador") String identificador);
    
    @Query("SELECT f FROM Fornecedor f WHERE f.deleted = false AND " +
           "(:nome IS NULL OR LOWER(f.nome) LIKE LOWER(CONCAT('%', :nome, '%'))) AND " +
           "(:identificador IS NULL OR f.identificador LIKE CONCAT('%', :identificador, '%'))")
    List<Fornecedor> findByFiltersActive(@Param("nome") String nome, @Param("identificador") String identificador);
    
}
