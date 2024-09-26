package isi.dan.ms.pedidos.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import isi.dan.ms.pedidos.dto.EstadoDTO;
import isi.dan.ms.pedidos.dto.ObraDTO;
import isi.dan.ms.pedidos.modelo.Cliente;
import isi.dan.ms.pedidos.modelo.Pedido;
import isi.dan.ms.pedidos.modelo.Producto;
import isi.dan.ms.pedidos.servicio.PedidoService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:3000")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<Pedido> createPedido(@RequestBody Pedido pedido) {
        Pedido savedPedido = pedidoService.savePedido(pedido);
        return ResponseEntity.ok(savedPedido);
    }

    @GetMapping
    public List<Pedido> getAllPedidos() {
        return pedidoService.getAllPedidos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable String id) {
        Pedido pedido = pedidoService.getPedidoById(id);
        return pedido != null ? ResponseEntity.ok(pedido) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable String id) {
        pedidoService.deletePedido(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/clientes-disponibles")
    public List<Cliente> getClientesDisponibles() {
        return pedidoService.getClientesDisponibles();
    }
    
    @GetMapping("/productos-disponibles")
    public List<Producto> getProductosDisponibles() {
        return pedidoService.getProductosDisponibles();
    }

    @GetMapping("/obras-disponibles/{id}")
    public List<ObraDTO> getObrasCliente(@PathVariable Integer id) {
        return pedidoService.getObrasCliente(id);
    }
    @PutMapping("/estado/{numeroPedido}")
    public ResponseEntity<Void> actualizarEstadoPedido(@PathVariable Integer numeroPedido, @RequestBody Map<String, String> nuevoEstado) {
        EstadoDTO estado = EstadoDTO.valueOf(nuevoEstado.get("estado"));
        boolean actualizado = pedidoService.actualizarEstadoPedido(numeroPedido, estado);
    
    if (actualizado) {
        return ResponseEntity.ok().build();
    }
    return ResponseEntity.notFound().build();
}

    
}

