package isi.dan.ms.pedidos.dto;

import lombok.Data;

@Data
public class DetallePedidoDTO {
    
    private Long idProducto;

    private int cantidad;
    


    public DetallePedidoDTO(Long idProducto, Integer cantidad) {
        this.idProducto = idProducto;
        this.cantidad = cantidad;
    }
}
