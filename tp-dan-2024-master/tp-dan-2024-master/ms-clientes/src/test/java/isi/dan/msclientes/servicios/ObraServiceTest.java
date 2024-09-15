package isi.dan.msclientes.servicios;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import isi.dan.msclientes.dao.ObraRepository;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.Obra;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ObraServiceTest {

    @Mock
    private ObraRepository obraRepository;

    @InjectMocks
    private ObraService obraService;

    private Cliente cliente;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Crear un cliente de prueba
        cliente = new Cliente();
        cliente.setId(1);
        cliente.setNombre("Cliente Test");
    }

    @Test
    void testSaveObraWithSpaceForActive() {
        Obra obra = new Obra();
        obra.setId(1);
        obra.setCliente(cliente);
        obra.setDireccion("Obra Test");

        when(obraRepository.countByClienteAndEstado(cliente, Obra.EstadoObra.HABILITADA)).thenReturn(3L);
        when(obraRepository.save(obra)).thenReturn(obra);

        Obra savedObra = obraService.save(obra);

        assertThat(savedObra.getEstado()).isEqualTo(Obra.EstadoObra.HABILITADA);
        verify(obraRepository).save(obra);
    }

    @Test
    void testSaveObraWithoutSpaceForActive() {
        Obra obra = new Obra();
        obra.setId(2);
        obra.setCliente(cliente);
        obra.setDireccion("Obra Test");

        when(obraRepository.countByClienteAndEstado(cliente, Obra.EstadoObra.HABILITADA)).thenReturn(5L);
        when(obraRepository.save(obra)).thenReturn(obra);

        Obra savedObra = obraService.save(obra);

        assertThat(savedObra.getEstado()).isEqualTo(Obra.EstadoObra.PENDIENTE);
        verify(obraRepository).save(obra);
    }

    @Test
    void testFinalizarObra() {
        Obra obra = new Obra();
        obra.setId(1);
        obra.setEstado(Obra.EstadoObra.PENDIENTE);
        obra.setCliente(cliente);

        when(obraRepository.findById(1)).thenReturn(Optional.of(obra));
        when(obraRepository.save(any(Obra.class))).thenReturn(obra);

        Obra finalizedObra = obraService.finalizarObra(1);

        assertThat(finalizedObra.getEstado()).isEqualTo(Obra.EstadoObra.FINALIZADA);
        verify(obraRepository).save(obra);
        verify(obraRepository).findById(1);
    }

    @Test
    void testHabilitarObrasPendientes() {
        // Crear una obra pendiente
        Obra pendienteObra = new Obra();
        pendienteObra.setId(2);
        pendienteObra.setEstado(Obra.EstadoObra.PENDIENTE);
        pendienteObra.setCliente(cliente);
    
        // Configurar el mock para que devuelva una obra con el ID 1 cuando se busque
        Obra obraParaFinalizar = new Obra();
        obraParaFinalizar.setId(1);
        obraParaFinalizar.setEstado(Obra.EstadoObra.HABILITADA);
        obraParaFinalizar.setCliente(cliente);
    
        when(obraRepository.findById(1)).thenReturn(Optional.of(obraParaFinalizar));
        when(obraRepository.countByClienteAndEstado(cliente, Obra.EstadoObra.HABILITADA)).thenReturn(4L);
        when(obraRepository.findFirstByClienteAndEstado(cliente, Obra.EstadoObra.PENDIENTE)).thenReturn(Optional.of(pendienteObra));
        when(obraRepository.save(any(Obra.class))).thenAnswer(invocation -> invocation.getArgument(0));
    
        // Ejecutar el método a probar
        Obra resultado = obraService.finalizarObra(1);
    
        // Verificar que el estado de la obra pendiente sea actualizado a HABILITADA
        assertThat(pendienteObra.getEstado()).isEqualTo(Obra.EstadoObra.HABILITADA);
        verify(obraRepository).save(pendienteObra);
    }
    


    @Test
    void testMarcarObraComoPendiente() {
        Obra obra = new Obra();
        obra.setId(1);
        obra.setEstado(Obra.EstadoObra.HABILITADA);

        when(obraRepository.findById(1)).thenReturn(Optional.of(obra));
        when(obraRepository.save(any(Obra.class))).thenReturn(obra);

        Obra updatedObra = obraService.marcarObraComoPendiente(1);

        assertThat(updatedObra.getEstado()).isEqualTo(Obra.EstadoObra.PENDIENTE);
        verify(obraRepository).save(obra);
    }

    @Test
    void testHabilitarObraSiCumpleCondicion() {
        Obra obra = new Obra();
        obra.setId(1);
        obra.setEstado(Obra.EstadoObra.PENDIENTE);
        obra.setCliente(cliente);

        when(obraRepository.findById(1)).thenReturn(Optional.of(obra));
        when(obraRepository.countByClienteAndEstado(cliente, Obra.EstadoObra.HABILITADA)).thenReturn(4L);
        when(obraRepository.save(any(Obra.class))).thenReturn(obra);

        Obra habilitadaObra = obraService.habilitarObraSiCumpleCondicion(1);

        assertThat(habilitadaObra.getEstado()).isEqualTo(Obra.EstadoObra.HABILITADA);
        verify(obraRepository).save(obra);
    }

    @Test
    void testHabilitarObraSiCumpleCondicionThrowsException() {
        Obra obra = new Obra();
        obra.setId(1);
        obra.setEstado(Obra.EstadoObra.PENDIENTE);
        obra.setCliente(cliente);

        when(obraRepository.findById(1)).thenReturn(Optional.of(obra));
        when(obraRepository.countByClienteAndEstado(cliente, Obra.EstadoObra.HABILITADA)).thenReturn(5L);

        try {
            obraService.habilitarObraSiCumpleCondicion(1);
        } catch (IllegalStateException e) {
            assertThat(e.getMessage()).isEqualTo("No se puede habilitar la obra, se ha alcanzado el máximo de obras activas.");
        }

        verify(obraRepository, never()).save(any(Obra.class));
    }
}
