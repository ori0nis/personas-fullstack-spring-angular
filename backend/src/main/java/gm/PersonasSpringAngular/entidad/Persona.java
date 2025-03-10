package gm.PersonasSpringAngular.entidad;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "persona")
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_persona")
    Integer idPersona;

    @NotEmpty
    String nombre;

    @NotEmpty
    @Email
    String email;

    public Persona(Integer idPersona) {
        this.idPersona = idPersona;
    }
}
