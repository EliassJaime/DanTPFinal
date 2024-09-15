package isi.dan.msclientes.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import isi.dan.msclientes.dao.ClienteRepository;
import isi.dan.msclientes.model.Cliente;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;

    @Value("${clientes.maximo.descubierto}") BigDecimal maximoDescubiertoPorDefecto;
    
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findById(Integer id) {
        return clienteRepository.findById(id);
    }

    public Cliente save(Cliente cliente) {
        if (cliente.getMaximoDescubierto() == null) {
            cliente.setMaximoDescubierto(maximoDescubiertoPorDefecto);
        } else if (cliente.getMaximoDescubierto().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El descubierto máximo debe ser mayor que cero.");
        }
        return clienteRepository.save(cliente);
    }

    public Cliente update(Cliente cliente) {
        if (cliente.getMaximoDescubierto() == null) {
            cliente.setMaximoDescubierto(maximoDescubiertoPorDefecto);
        } else if (cliente.getMaximoDescubierto().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El descubierto máximo debe ser mayor que cero.");
        }
        return clienteRepository.save(cliente);
    }

    public void deleteById(Integer id) {
        clienteRepository.deleteById(id);
    }
}
