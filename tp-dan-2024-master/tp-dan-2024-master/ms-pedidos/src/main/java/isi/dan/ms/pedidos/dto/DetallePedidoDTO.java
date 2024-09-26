package isi.dan.ms.pedidos.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class DetallePedidoDTO implements Serializable {
    
    private Long idProducto;

    private int cantidad;
    


    public DetallePedidoDTO(Long idProducto, Integer cantidad) {
        this.idProducto = idProducto;
        this.cantidad = cantidad;
    }
    
}
