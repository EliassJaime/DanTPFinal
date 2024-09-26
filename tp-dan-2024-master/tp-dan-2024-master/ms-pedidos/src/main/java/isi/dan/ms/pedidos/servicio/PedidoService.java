package isi.dan.ms.pedidos.servicio;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import isi.dan.ms.pedidos.conf.RabbitMQConfig;
import isi.dan.ms.pedidos.dao.PedidoRepository;
import isi.dan.ms.pedidos.dto.DetallePedidoDTO;
import isi.dan.ms.pedidos.dto.EstadoDTO;
import isi.dan.ms.pedidos.dto.ObraDTO;
import isi.dan.ms.pedidos.modelo.Cliente;
import isi.dan.ms.pedidos.modelo.DetallePedido;
import isi.dan.ms.pedidos.modelo.Estado;
import isi.dan.ms.pedidos.modelo.Pedido;
import isi.dan.ms.pedidos.modelo.Producto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
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

    public boolean actualizarStockProducto(List<DetallePedidoDTO> detalles) {
        return webClientBuilder.build()
            .put()
            .uri("http://ms-productos-svc-1:8080/api/productos/stockpedido")
            .bodyValue(detalles)  
            .retrieve()
            .bodyToMono(Boolean.class)  
            .block();  
    }

    public Pedido savePedido(Pedido pedido) {

    // Asignar número de pedido
    Integer numeroPedido = pedidoRepository.findAll().size() + 1;
    pedido.setNumeroPedido(numeroPedido);

    // Asignar fecha de creación del pedido
    pedido.setFecha(Instant.now());

    // Calcular el monto total del pedido
    BigDecimal totalPedido = BigDecimal.ZERO;

    // Creamos estructuras para cargar DetallePedidoDTO
    List<DetallePedidoDTO> detalledto = new ArrayList<DetallePedidoDTO>();

    for (DetallePedido detalle : pedido.getDetalle()) {
        detalledto.add(new DetallePedidoDTO(detalle.getProducto().getId(), detalle.getCantidad()));
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

    // Buscamos todos los pedidos asignados al cliente y sumamos el monto de todos los pedidos que esteen EN_PREPARACION 
    // o ACEPTADO
     List<Pedido> pedidosCliente= findPedidosByClienteId(pedido.getCliente().getId());
     BigDecimal montoTodosPedidos=BigDecimal.ZERO;
     for (Pedido pedidoCliente : pedidosCliente) {
        
    if (pedidoCliente.getEstado() == Estado.EN_PREPARACION || 
        pedidoCliente.getEstado() == Estado.ACEPTADO) {
        montoTodosPedidos = montoTodosPedidos.add(pedidoCliente.getTotal());
    }}

    // Si el monto de todos los pedidos del cliente + el del pedido actual es menor al maximo descubierto del cliente
    // ponemos el pedido con estado RECHAZADO.
    if(montoTodosPedidos.add(totalPedido).compareTo(maxDes) > 0){
       pedido.setEstado(Estado.RECHAZADO);
       return pedidoRepository.save(pedido);
    }
        
    // Validamos y actualizamos el stock de los productos 
    System.out.println("Detalles del pedido enviados: " + detalledto);
    boolean stockSuficiente = actualizarStockProducto(detalledto);

    // Si actualizamos todos los productos correctamente, seteamos el pedido con estado EN_PREPARACION
    if(stockSuficiente){
    pedido.setEstado(Estado.EN_PREPARACION);
    return pedidoRepository.save(pedido);
    }
    // Caso contrario, lo seteamos con estado ACEPTADO


    pedido.setEstado(Estado.ACEPTADO);
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

    public boolean actualizarEstadoPedido(Integer numeroPedido, EstadoDTO nuevoEstado) {
        Pedido pedido=pedidoRepository.findBynumeroPedido(numeroPedido);

        // Creamos estructuras para cargar DetallePedidoDTO
    List<DetallePedidoDTO> detalledto = new ArrayList<DetallePedidoDTO>();
        
    for (DetallePedido detalle : pedido.getDetalle()) {
        detalledto.add(new DetallePedidoDTO(detalle.getProducto().getId(), detalle.getCantidad()));
    }

        if (nuevoEstado.equals(EstadoDTO.CANCELADO)) {
            pedido.setEstado(Estado.CANCELADO);
            enviarMensajeDevolverStock(detalledto);
        } else if (nuevoEstado.equals(EstadoDTO.ENTREGADO)) {
            pedido.setEstado(Estado.ENTREGADO);
        }
        // Guardar el pedido actualizado
        pedidoRepository.save(pedido);
        return true;
    }
    @Autowired
    private ObjectMapper objectMapper;
    // Enviar mensaje a RabbitMQ para devolver stock
    private void enviarMensajeDevolverStock(List<DetallePedidoDTO> detalle) {
        try {
            // Serializar la lista de DetallePedidoDTO a JSON
            String mensajeJson = objectMapper.writeValueAsString(detalle);
            
            // Crear las propiedades del mensaje
            MessageProperties messageProperties = new MessageProperties();
            messageProperties.setContentType("application/json");
            
            // Construir el mensaje
            Message message = MessageBuilder.withBody(mensajeJson.getBytes())
                .andProperties(messageProperties)
                .build();
            
            // Enviar el mensaje a la cola
            rabbitTemplate.send(RabbitMQConfig.STOCK_UPDATE_QUEUE, message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            // Manejo de excepciones según sea necesario
        }
    }
}
