package isi.dan.msclientes.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isi.dan.msclientes.dao.ObraRepository;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.Obra;

import java.util.List;
import java.util.Optional;

@Service
public class ObraService {
    private static final int MAX_OBRAS_ACTIVAS = 5;
    @Autowired
    private ObraRepository obraRepository;

    public List<Obra> findAll() {
        return obraRepository.findAll();
    }

    public Optional<Obra> findById(Integer id) {
        return obraRepository.findById(id);
    }

    public Obra save(Obra obra) {

        Cliente cliente = obra.getCliente();
        
        // Verificar el número de obras activas del cliente
        long obrasActivas = obraRepository.countByClienteAndEstado(cliente, Obra.EstadoObra.HABILITADA);

        if (obrasActivas < MAX_OBRAS_ACTIVAS) {
            obra.setEstado(Obra.EstadoObra.HABILITADA);
        } else {
            obra.setEstado(Obra.EstadoObra.PENDIENTE);
        }
        return obraRepository.save(obra);
    }
    // Método para finalizar una obra y habilitar las pendientes si es posible
    public Obra finalizarObra(Integer id) {
        Obra obra = obraRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Obra no encontrada"));

        if (obra.getEstado() != Obra.EstadoObra.FINALIZADA) {
            obra.setEstado(Obra.EstadoObra.FINALIZADA);
            obraRepository.save(obra);

            // Verificar si alguna obra pendiente puede ser habilitada
            habilitarObrasPendientes(obra.getCliente());
        }

        return obra;
    }

    // Método para habilitar una obra pendiente si hay espacio disponible
    private void habilitarObrasPendientes(Cliente cliente) {
        long obrasActivas = obraRepository.countByClienteAndEstado(cliente, Obra.EstadoObra.HABILITADA);

        if (obrasActivas < MAX_OBRAS_ACTIVAS) {
            // Buscar la primera obra pendiente y habilitarla
            Optional<Obra> obraPendiente = obraRepository.findFirstByClienteAndEstado(cliente, Obra.EstadoObra.PENDIENTE);
            if (obraPendiente.isPresent()) {
                Obra obra = obraPendiente.get();
                obra.setEstado(Obra.EstadoObra.HABILITADA);
                obraRepository.save(obra);
            }
        }
    }

    // Método para cambiar el estado de una obra a Pendiente sin habilitar otras obras
    public Obra marcarObraComoPendiente(Integer id) {
        Obra obra = obraRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Obra no encontrada"));

        if (obra.getEstado() != Obra.EstadoObra.PENDIENTE) {
            obra.setEstado(Obra.EstadoObra.PENDIENTE);
            obraRepository.save(obra);
        }

        return obra;
    }

    // Método para habilitar una obra si se cumplen las condiciones
    public Obra habilitarObraSiCumpleCondicion(Integer id) {
        Obra obra = obraRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Obra no encontrada"));

        if (obra.getEstado() == Obra.EstadoObra.PENDIENTE) {
            Cliente cliente = obra.getCliente();
            
            // Verificar el número de obras activas del cliente
            long obrasActivas = obraRepository.countByClienteAndEstado(cliente, Obra.EstadoObra.HABILITADA);

            if (obrasActivas < MAX_OBRAS_ACTIVAS) {
                obra.setEstado(Obra.EstadoObra.HABILITADA);
                obraRepository.save(obra);
            } else {
                throw new IllegalStateException("No se puede habilitar la obra, se ha alcanzado el máximo de obras activas.");
            }
        }

        return obra;
    }
    
    public Obra update(Obra obra) {
        return obraRepository.save(obra);
    }

    public void deleteById(Integer id) {
        obraRepository.deleteById(id);
    }
}

