package isi.dan.msclientes.servicios;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Value;

import isi.dan.msclientes.dao.ClienteRepository;
import isi.dan.msclientes.model.Cliente;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteService clienteService;

    @Value("${clientes.maximo.descubierto}")
    private BigDecimal maximoDescubiertoPorDefecto = BigDecimal.valueOf(1000);

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Simular el valor de la propiedad si es necesario
        clienteService.maximoDescubiertoPorDefecto = maximoDescubiertoPorDefecto;
    }

    @Test
    void testSaveClienteWithNullMaximoDescubierto() {
        Cliente cliente = new Cliente();
        cliente.setNombre("Cliente Test");

        when(clienteRepository.save(cliente)).thenReturn(cliente);

        Cliente savedCliente = clienteService.save(cliente);

        assertThat(savedCliente.getMaximoDescubierto()).isEqualTo(maximoDescubiertoPorDefecto);
        verify(clienteRepository).save(cliente);
    }

    @Test
    void testSaveClienteWithNegativeMaximoDescubierto() {
        Cliente cliente = new Cliente();
        cliente.setNombre("Cliente Test");
        cliente.setMaximoDescubierto(BigDecimal.valueOf(-100));

        try {
            clienteService.save(cliente);
        } catch (IllegalArgumentException e) {
            assertThat(e.getMessage()).isEqualTo("El descubierto máximo debe ser mayor que cero.");
        }

        verify(clienteRepository, never()).save(cliente);
    }

    @Test
    void testUpdateClienteWithNullMaximoDescubierto() {
        Cliente cliente = new Cliente();
        cliente.setId(1);
        cliente.setNombre("Cliente Test");

        when(clienteRepository.save(cliente)).thenReturn(cliente);

        Cliente updatedCliente = clienteService.update(cliente);

        assertThat(updatedCliente.getMaximoDescubierto()).isEqualTo(maximoDescubiertoPorDefecto);
        verify(clienteRepository).save(cliente);
    }

    @Test
    void testUpdateClienteWithNegativeMaximoDescubierto() {
        Cliente cliente = new Cliente();
        cliente.setId(1);
        cliente.setNombre("Cliente Test");
        cliente.setMaximoDescubierto(BigDecimal.valueOf(-100));

        try {
            clienteService.update(cliente);
        } catch (IllegalArgumentException e) {
            assertThat(e.getMessage()).isEqualTo("El descubierto máximo debe ser mayor que cero.");
        }

        verify(clienteRepository, never()).save(cliente);
    }

    @Test
    void testFindById() {
        Cliente cliente = new Cliente();
        cliente.setId(1);
        cliente.setNombre("Cliente Test");

        when(clienteRepository.findById(1)).thenReturn(Optional.of(cliente));

        Optional<Cliente> foundCliente = clienteService.findById(1);

        assertThat(foundCliente).isPresent();
        assertThat(foundCliente.get().getNombre()).isEqualTo("Cliente Test");
    }

    @Test
    void testDeleteById() {
        Cliente cliente = new Cliente();
        cliente.setId(1);

        clienteService.deleteById(1);

        verify(clienteRepository).deleteById(1);
    }
}
