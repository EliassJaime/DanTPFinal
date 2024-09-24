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
import isi.dan.ms.pedidos.modelo.Pedido;
import isi.dan.ms.pedidos.modelo.Producto;

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


    public Pedido savePedido(Pedido pedido) {
        for( DetallePedido dp : pedido.getDetalle()){
            log.info("Enviando {}", dp.getProducto().getId()+";"+dp.getCantidad());
            rabbitTemplate.convertAndSend(RabbitMQConfig.STOCK_UPDATE_QUEUE, dp.getProducto().getId()+";"+dp.getCantidad());
        }
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
}
