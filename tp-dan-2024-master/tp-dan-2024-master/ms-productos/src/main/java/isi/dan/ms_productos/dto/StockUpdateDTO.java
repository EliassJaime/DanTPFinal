package isi.dan.ms_productos.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class StockUpdateDTO {
    private Long idProducto;
    private Integer cantidad;
    private BigDecimal nuevoPrecio;
}
