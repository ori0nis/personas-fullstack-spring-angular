import { Component } from '@angular/core';
import { Persona } from '../persona.model';
import { PersonaService } from '../persona-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personas',
  standalone: false,
  templateUrl: './personas.component.html',
})

export class PersonasComponent {

  personas: Persona[] = [];

  constructor(private personaService: PersonaService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.personaService.obtenerPersonas()
    .subscribe(
      (personasGuardadas: Persona[]) => {
        // Cargamos los datos de la persona guardada en el array:
        this.personas = personasGuardadas;
        this.personaService.setPersonas(this.personas);
        console.log("Personas obtenidas: " + this.personas);
      }
    )
  }

  irAgregar(){
    console.log("Vamos a agregar");
    this.router.navigate(['./personas-app/personas/agregar']);
  }
}
