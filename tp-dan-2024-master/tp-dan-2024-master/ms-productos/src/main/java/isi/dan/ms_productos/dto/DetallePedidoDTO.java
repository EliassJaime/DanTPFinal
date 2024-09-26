package isi.dan.ms_productos.dto;

import java.io.Serializable;

import isi.dan.ms_productos.modelo.Producto;
import lombok.Data;

@Data
public class DetallePedidoDTO implements Serializable {
    
    private Long idProducto;

    private int cantidad;
    

}
