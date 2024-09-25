package isi.dan.ms.pedidos.servicio;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import isi.dan.ms.pedidos.conf.RabbitMQConfig;
import isi.dan.ms.pedidos.dao.PedidoRepository;
import isi.dan.ms.pedidos.dto.ObraDTO;
import isi.dan.ms.pedidos.modelo.Cliente;
import isi.dan.ms.pedidos.modelo.DetallePedido;
import isi.dan.ms.pedidos.modelo.Estado;
import isi.dan.ms.pedidos.modelo.Pedido;
import isi.dan.ms.pedidos.modelo.Producto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    Logger log = LoggerFactory.getLogger(PedidoService.class);

    private final WebClient.Builder webClientBuilder;
    public PedidoService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    public List<Cliente> getClientesDisponibles() {
        return webClientBuilder.build()
            .get()
            .uri("http://ms-clientes-svc-1:8080/api/clientes")
            .retrieve()
            .bodyToFlux(Cliente.class) 
            .collectList()
            .block();
    }
    public List<ObraDTO> getObrasCliente(Integer id) {
        return webClientBuilder.build()
            .get()
            .uri(String.format("http://ms-clientes-svc-1:8080/api/obras/cliente/%d", id))
            .retrieve()
            .bodyToFlux(ObraDTO.class) 
            .collectList()
            .block();
    }

    public List<Producto> getProductosDisponibles() {
        return webClientBuilder.build()
            .get()
            .uri("http://ms-productos-svc-1:8080/api/productos")
            .retrieve()
            .bodyToFlux(Producto.class) 
            .collectList()
            .block();
    }

    public BigDecimal buscarMaximoDescubierto(Integer clienteId) {
        return webClientBuilder.build()
            .get()
            .uri(String.format("http://ms-clientes-svc-1:8080/api/clientes/maxdescubierto/%d", clienteId))
            .retrieve()
            .bodyToMono(BigDecimal.class)
            .block();
    }

    public Pedido savePedido(Pedido pedido) {

        // Asignar número de pedido (puedes usar el total de pedidos + 1 como número secuencial)
    Integer numeroPedido = pedidoRepository.findAll().size() + 1;
    pedido.setNumeroPedido(numeroPedido);

    // Asignar fecha de creación del pedido
    pedido.setFecha(Instant.now());

    // Calcular el monto total del pedido
    BigDecimal totalPedido = BigDecimal.ZERO;

    for (DetallePedido detalle : pedido.getDetalle()) {
        // Calcular el monto total de cada línea de detalle (cantidad * precioUnitario - descuento)
        BigDecimal subtotal = detalle.getPrecioUnitario().multiply(BigDecimal.valueOf(detalle.getCantidad()));
        if (detalle.getDescuento() != null) {
            subtotal = subtotal.subtract(detalle.getDescuento());
        }
        detalle.setPrecioFinal(subtotal);

        // Sumar al total del pedido
        totalPedido = totalPedido.add(subtotal);
    }

    // Asignar el total del pedido
    pedido.setTotal(totalPedido);

    
     // Verificar saldo disponible del cliente
     BigDecimal maxDes = buscarMaximoDescubierto(pedido.getCliente().getId());

     List<Pedido> pedidosCliente= findPedidosByClienteId(pedido.getCliente().getId());
     BigDecimal montoTodosPedidos=BigDecimal.ZERO;
     for (Pedido pedidoCliente : pedidosCliente) {
        
    if (pedidoCliente.getEstado() == Estado.EN_PREPARACION || 
        pedidoCliente.getEstado() == Estado.ACEPTADO) {
        montoTodosPedidos = montoTodosPedidos.add(pedidoCliente.getTotal());
    }}

    if(montoTodosPedidos.add(totalPedido).compareTo(maxDes) > 0){
       // Si no tiene saldo, marcar el pedido como RECHAZADO
       pedido.setEstado(Estado.RECHAZADO);
       return pedidoRepository.save(pedido);
    }
    pedido.setEstado(Estado.ACEPTADO);
    
    // Aquí agregas la lógica para verificar saldo, actualizar stock, etc.
    
    // Enviar detalles de stock a RabbitMQ (lo que ya tienes)
    for (DetallePedido dp : pedido.getDetalle()) {
        log.info("Enviando {}", dp.getProducto().getId() + ";" + dp.getCantidad());
        rabbitTemplate.convertAndSend(RabbitMQConfig.STOCK_UPDATE_QUEUE, dp.getProducto().getId() + ";" + dp.getCantidad());
    }

    // Guardar el pedido en la base de datos
    return pedidoRepository.save(pedido);

    }

    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    public Pedido getPedidoById(String id) {
        return pedidoRepository.findById(id).orElse(null);
    }

    public void deletePedido(String id) {
        pedidoRepository.deleteById(id);
    }

    public List<Pedido> findPedidosByClienteId(Integer clienteId) {
        return pedidoRepository.findByClienteId(clienteId);
    }
}
