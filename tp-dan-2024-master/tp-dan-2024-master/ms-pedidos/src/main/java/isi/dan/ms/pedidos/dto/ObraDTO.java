package isi.dan.ms.pedidos.dto;

import java.math.BigDecimal;

import isi.dan.ms.pedidos.modelo.Cliente;
import lombok.Data;

@Data
public class ObraDTO {
    public enum EstadoObra {
        HABILITADA,
        PENDIENTE,
        FINALIZADA
    }
    private EstadoObra estado;
    private Integer id;
    private Cliente cliente;
    private BigDecimal presupuesto;
}

