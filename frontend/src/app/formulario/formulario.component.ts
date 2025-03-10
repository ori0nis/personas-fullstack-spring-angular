import { Persona } from './../persona.model';
import { Component } from '@angular/core';
import { PersonaService } from '../persona-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.component.html',
})
export class FormularioComponent {

  idPersona: number;
  nombreInput: string;
  emailInput: string;

  constructor(private personaService: PersonaService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    // Suscríbete a los cambios en los parámetros de la ruta
    this.route.params.subscribe(params => {
        this.idPersona = params['idPersona'];
        console.log("Parámetro idPersona: " + this.idPersona);

        if(this.idPersona != null){
            this.personaService.encontrarPersona(this.idPersona)
            .subscribe(
                (persona) => {
                    if(persona){
                        this.nombreInput = persona.nombre;
                        this.emailInput = persona.email;
                    }
                },
                (error) => {
                    console.error("Error al buscar a la persona: " + error);
                }
            );
        }
    });
}

  onGuardarPersona(){
    const personaAGuardar = new Persona(this.idPersona, this.nombreInput, this.emailInput);

    if(this.idPersona != null){
      // Tendríamos que modificar en lugar de agregar:
      this.personaService.modificarPersona(this.idPersona, personaAGuardar);
    } else {
      this.personaService.agregarPersona(personaAGuardar);
    }
    this.router.navigate(['personas-app/personas']);
  }

  onEliminarPersona(){
    if(this.idPersona != null){
      console.log("Persona a eliminar: " + this.idPersona);
      this.personaService.eliminarPersona(this.idPersona).subscribe(
        (data) => {
          console.log("Persona eliminada: " + data);
          this.router.navigate(['personas-app/personas']);
        },
        (error) => {
          console.error("Error al eliminar la persona: " + error);
        }
      )
    }
  }
}
