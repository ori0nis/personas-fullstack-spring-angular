package gm.PersonasSpringAngular.repositorio;

import gm.PersonasSpringAngular.entidad.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPersonaRepositorio extends JpaRepository<Persona, Integer> {
}
