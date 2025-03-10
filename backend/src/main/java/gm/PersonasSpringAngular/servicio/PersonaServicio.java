package gm.PersonasSpringAngular.servicio;

import gm.PersonasSpringAngular.entidad.Persona;
import gm.PersonasSpringAngular.repositorio.IPersonaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PersonaServicio implements IPersonaServicio {

    @Autowired
    IPersonaRepositorio personaRepositorio;

    @Override
    public List<Persona> listarPersonas() {
        return personaRepositorio.findAll();
    }

    @Override
    public Persona buscarPersonaPorId(Integer idPersona) {
        return personaRepositorio.findById(idPersona).orElse(null);
    }

    @Override
    public Persona guardarPersona(Persona persona) {
        return personaRepositorio.save(persona);
    }

    @Override
    public void eliminarPersonaPorId(Integer idPersona) {
        personaRepositorio.deleteById(idPersona);
    }
}
