package isi.dan.ms_productos.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


import isi.dan.ms_productos.aop.LogExecutionTime;
import isi.dan.ms_productos.dto.DescuentoUpdateDTO;
import isi.dan.ms_productos.dto.DetallePedidoDTO;
import isi.dan.ms_productos.dto.StockUpdateDTO;
import isi.dan.ms_productos.exception.ProductoNotFoundException;
import isi.dan.ms_productos.modelo.Categoria;
import isi.dan.ms_productos.modelo.Producto;
import isi.dan.ms_productos.servicio.ProductoService;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    @Autowired
    private ProductoService productoService;

    Logger log = LoggerFactory.getLogger(ProductoController.class);

    @PostMapping
    @LogExecutionTime
    public ResponseEntity<Producto> createProducto(@RequestBody @Validated Producto producto) {
        Producto savedProducto = productoService.saveProducto(producto);
        return ResponseEntity.ok(savedProducto);
    }

    @GetMapping
    @LogExecutionTime
    public List<Producto> getAllProductos() {
        return productoService.getAllProductos();
    }

    @GetMapping("/{id}")
    @LogExecutionTime
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) throws ProductoNotFoundException {
        return  ResponseEntity.ok(productoService.getProductoById(id));
    }

    @DeleteMapping("/{id}")
    @LogExecutionTime
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
        return ResponseEntity.noContent().build();
    }

@GetMapping("/categoria/{categoria}")
@LogExecutionTime
public ResponseEntity<List<Producto>> getProductosByCategoria(@PathVariable Categoria categoria) {
    List<Producto> productos = productoService.getProductosByCategoria(categoria);
    return ResponseEntity.ok(productos);
}

@PutMapping("/provision")
@LogExecutionTime
public ResponseEntity<Producto> actualizarStockYPrecio(@RequestBody @Validated StockUpdateDTO provisionDTO) throws ProductoNotFoundException {
    Producto productoActualizado = productoService.actualizarStockYPrecio(provisionDTO.getIdProducto(), provisionDTO.getCantidad(), provisionDTO.getNuevoPrecio());
    return ResponseEntity.ok(productoActualizado);
}

@PutMapping("/promocion/descuento")
@LogExecutionTime
public ResponseEntity<Producto> actualizarDescuentoPromocional(@RequestBody @Validated DescuentoUpdateDTO descuentoDTO) throws ProductoNotFoundException {
    Producto productoActualizado = productoService.actualizarDescuentoPromocional(descuentoDTO.getIdProducto(), descuentoDTO.getNuevoDescuento());
    return ResponseEntity.ok(productoActualizado);
}

@PutMapping("/stockpedido")
@LogExecutionTime
    public ResponseEntity<Boolean> verificarYActualizarStock(@RequestBody @Validated List<DetallePedidoDTO> detalles)throws ProductoNotFoundException {
        System.out.println("Detalles del pedido recibidos: " + detalles);
        boolean stockSuficiente = productoService.verificarYActualizarStock(detalles);
        return ResponseEntity.ok(stockSuficiente);
    }


}

