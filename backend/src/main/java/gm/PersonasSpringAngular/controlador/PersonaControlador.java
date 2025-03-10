package gm.PersonasSpringAngular.controlador;

import gm.PersonasSpringAngular.entidad.Persona;
import gm.PersonasSpringAngular.servicio.PersonaServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("personas-app")
@CrossOrigin(value = "http://localhost:4200")
public class PersonaControlador {

    private static final Logger logger = LoggerFactory.getLogger(PersonaControlador.class);

    @Autowired
    PersonaServicio personaServicio;

    @GetMapping("/personas")
    public List<Persona> listarPersonas(){
        List<Persona> personas = personaServicio.listarPersonas();
        logger.info("Personas en la lista: " + personas);
        personas.forEach((persona) -> logger.info(persona.toString()));
        return personas;
    }

    @GetMapping("/personas/{id}")
    public ResponseEntity<Persona> obtenerPersonaPorId(@PathVariable Integer id){
        Persona persona = personaServicio.buscarPersonaPorId(id);
        if(persona != null){
            return ResponseEntity.ok(persona);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/personas")
    public Persona agregarPersona(@RequestBody Persona persona){
        logger.info("Persona a agregar: " + persona);
        return personaServicio.guardarPersona(persona);
    }

    @PutMapping("/personas/{id}")
    public ResponseEntity<Persona> actualizarPersona(@PathVariable Integer id,
                                                     @RequestBody Persona personaRecibida){
        Persona persona = personaServicio.buscarPersonaPorId(id);
        if(persona != null){
            persona.setNombre(personaRecibida.getNombre());
            persona.setEmail(personaRecibida.getEmail());
            personaServicio.guardarPersona(persona);
            return ResponseEntity.ok(persona);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/personas/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarPersona(@PathVariable Integer id){
        Persona persona = personaServicio.buscarPersonaPorId(id);
        if(persona != null){
            personaServicio.eliminarPersonaPorId(persona.getIdPersona());
            Map<String, Boolean> respuesta = new HashMap<>();
            respuesta.put("eliminado", Boolean.TRUE);
            return ResponseEntity.ok(respuesta);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
