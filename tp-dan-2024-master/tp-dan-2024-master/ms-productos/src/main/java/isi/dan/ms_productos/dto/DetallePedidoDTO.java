package isi.dan.ms_productos.dto;

import isi.dan.ms_productos.modelo.Producto;
import lombok.Data;

@Data
public class DetallePedidoDTO {
    
    private Producto producto;

    private int cantidad;


}
