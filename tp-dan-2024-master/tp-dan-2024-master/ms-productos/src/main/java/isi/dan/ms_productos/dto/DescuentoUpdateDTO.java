package isi.dan.ms_productos.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DescuentoUpdateDTO {
    private Long idProducto;
    private BigDecimal nuevoDescuento;
}
