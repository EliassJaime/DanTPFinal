package isi.dan.ms_productos.servicio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isi.dan.ms_productos.conf.RabbitMQConfig;
import isi.dan.ms_productos.dao.ProductoRepository;
import isi.dan.ms_productos.dto.StockUpdateDTO;
import isi.dan.ms_productos.exception.ProductoNotFoundException;
import isi.dan.ms_productos.modelo.Categoria;
import isi.dan.ms_productos.modelo.Producto;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;
    Logger log = LoggerFactory.getLogger(ProductoService.class);

    @RabbitListener(queues = RabbitMQConfig.STOCK_UPDATE_QUEUE)
    public void handleStockUpdate(Message msg) {
        log.info("Recibido {}", msg);
        // buscar el producto
        // actualizar el stock
        // verificar el punto de pedido y generar un pedido
    }



    public Producto saveProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    public Producto getProductoById(Long id) throws ProductoNotFoundException{
        return productoRepository.findById(id).orElseThrow(() -> new ProductoNotFoundException(id));
    }

    public void deleteProducto(Long id) {
        productoRepository.deleteById(id);
    }

    public List<Producto> getProductosByCategoria(Categoria categoria) {
        return productoRepository.findByCategoria(categoria);
    }

    public Categoria[] getCategorias(){
        return Categoria.values();
    }

    public Producto actualizarStockYPrecio(Long productoId, int cantidadStock, BigDecimal nuevoPrecio) throws ProductoNotFoundException {
    Producto producto = productoRepository.findById(productoId)
        .orElseThrow(() -> new ProductoNotFoundException(productoId));
    
    // Actualizar stock
    producto.setStockActual(producto.getStockActual() + cantidadStock);
    
    // Actualizar precio
    producto.setPrecio(nuevoPrecio);
    
    return productoRepository.save(producto);
}
public Producto actualizarDescuentoPromocional(Long productoId, BigDecimal nuevoDescuento) throws ProductoNotFoundException {
    Producto producto = productoRepository.findById(productoId)
        .orElseThrow(() -> new ProductoNotFoundException(productoId));

    // Actualizar el descuento promocional
    producto.setDescuentoPromocional(nuevoDescuento);

    return productoRepository.save(producto);
}


}

