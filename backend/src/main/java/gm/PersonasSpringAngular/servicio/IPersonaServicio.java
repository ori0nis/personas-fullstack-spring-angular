package gm.PersonasSpringAngular.servicio;

import gm.PersonasSpringAngular.entidad.Persona;
import org.springframework.stereotype.Service;
import java.util.List;

public interface IPersonaServicio {

    public List<Persona> listarPersonas();

    public Persona buscarPersonaPorId(Integer idPersona);

    public Persona guardarPersona(Persona persona);

    public void eliminarPersonaPorId(Integer idPersona);
}
