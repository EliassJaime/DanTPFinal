package isi.dan.msclientes.dao;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.Obra;

@Repository
public interface ObraRepository extends JpaRepository<Obra, Integer> {

    List<Obra> findByPresupuestoGreaterThanEqual(BigDecimal price);
    long countByClienteAndEstado(Cliente cliente, Obra.EstadoObra estado);
     // Encuentra la primera obra pendiente de un cliente
     Optional<Obra> findFirstByClienteAndEstado(Cliente cliente, Obra.EstadoObra estado);

     List<Obra> findByCliente(Cliente cliente);
}

