package isi.dan.msclientes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import isi.dan.msclientes.aop.LogExecutionTime;
import isi.dan.msclientes.model.Obra;
import isi.dan.msclientes.servicios.ObraService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/obras")
public class ObraController {

    @Autowired
    private ObraService obraService;

    @GetMapping
    @LogExecutionTime
    public List<Obra> getAll() {
        return obraService.findAll();
    }

    @GetMapping("/{id}")
    @LogExecutionTime
    public ResponseEntity<Obra> getById(@PathVariable Integer id) {
        Optional<Obra> obra = obraService.findById(id);
        return obra.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Obra create(@RequestBody Obra obra) {
        return obraService.save(obra);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Obra> update(@PathVariable Integer id, @RequestBody Obra obra) {
        if (!obraService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        obra.setId(id);
        return ResponseEntity.ok(obraService.update(obra));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!obraService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        obraService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint para finalizar una obra
    @PutMapping("/finalizar/{id}")
    public ResponseEntity<Obra> finalizarObra(@PathVariable Integer id) {
        try {
            Obra obra = obraService.finalizarObra(id);
            return ResponseEntity.ok(obra);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // 404 si no se encuentra la obra
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);  // 500 para otros errores
        }
    }

     // Endpoint para marcar una obra como Pendiente
     @PutMapping("/marcar-pendiente/{id}")
     public ResponseEntity<Obra> marcarObraComoPendiente(@PathVariable Integer id) {
         try {
             Obra obra = obraService.marcarObraComoPendiente(id);
             return ResponseEntity.ok(obra);
         } catch (IllegalArgumentException e) {
             return ResponseEntity.notFound().build();
         }
     }

     // Endpoint para habilitar una obra si cumple las condiciones
    @PutMapping("/habilitar/{id}")
    public ResponseEntity<Obra> habilitarObraSiCumpleCondicion(@PathVariable Integer id) {
        try {
            Obra obra = obraService.habilitarObraSiCumpleCondicion(id);
            return ResponseEntity.ok(obra);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(null);  // 409 Conflict si no se puede habilitar
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
