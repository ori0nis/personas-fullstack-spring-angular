import { Injectable } from "@angular/core";
import { Persona } from "./persona.model";
import { DataService } from "./data-service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PersonaService {

  personas: Persona[] = [];

  constructor(private dataService: DataService){}

  // Con esto modificamos el valor del array en la llamada asíncrona:
  setPersonas(personas: Persona[]){
    this.personas = personas;
  }

  obtenerPersonas(){
    return this.dataService.cargarPersonas();
  }

  agregarPersona(persona: Persona){
    console.log("Persona a agregar: " + persona.nombre);
    this.dataService.agregarPersona(persona)
    .subscribe(
      (personaGuardada: Persona) => {
        // Recuperamos el objeto Persona con el idPersona recién agregado:
        console.log("Se agrega al array la persona insertada: " + personaGuardada.idPersona);
        this.personas.push(personaGuardada);
      },
      (error) => {
        console.error("Error al agregar la persona: " + error);
      }
    );
  }

encontrarPersona(id: number): Observable<Persona> {
    return this.dataService.obtenerPersonaPorId(id);
}

modificarPersona(id: number, persona: Persona){
  console.log("Persona a modificar: " + persona.idPersona);

  const personaModificada = this.personas.find(persona => persona.idPersona == id);

  if(personaModificada){
    personaModificada.idPersona = persona.idPersona;
    personaModificada.nombre = persona.nombre;
    personaModificada.email = persona.email;

    // Enviamos la petición al backend (si no hacemos subscribe, la petición HTTP no se enviará):
    this.dataService.modificarPersona(id, persona).subscribe(
      (data) => {
        console.log("Persona modificada en el backend: " + data)
      },
      (error) => {
        console.error("Error al modificar la persona: " + error);
      }
    )
  } else {
      console.log("No se encuentra a la persona: " + persona);
  }
}

eliminarPersona(id: number){
  console.log("Eliminar persona con id: " + id);
  // Eliminamos la persona del array y también del backend:
  const index = this.personas.findIndex(persona => persona.idPersona == id);
  this.personas.splice(index, 1); // Del array
  // Retornamos el Observable para que otros métodos puedan suscribirse:
  return this.dataService.eliminarPersona(id); // Del backend
  }
}
