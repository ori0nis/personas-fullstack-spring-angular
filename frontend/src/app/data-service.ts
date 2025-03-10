import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Persona } from "./persona.model";
import { Observable } from "rxjs";

// Esta es la clase que se conecta a los web services (emula los métodos del backend). Esta clase solo recupera info, no la administra. Eso lo hace persona.service.
@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient ){}

  // Nuestra url:
  private urlBase = "http://localhost:8080/personas-app/personas";

  // Esta es una petición asíncrona que no devuelve un valor de inmediato, para obtener los valores tenemos que hacer subscribe en el método que los administra.
  cargarPersonas(): Observable<Persona[]>{
    // Con esto es suficiente porque, del lado del servidor, este path ya lista las personas con un get:
    return this.httpClient.get<Persona[]>(this.urlBase);
  }

  obtenerPersonaPorId(idPersona: number): Observable<Persona>{
    return this.httpClient.get<Persona>(`${this.urlBase}/${idPersona}`);
  }

  agregarPersona(persona: Persona): Observable<Persona>{
    return this.httpClient.post<Persona>(this.urlBase, persona);
  }

  modificarPersona(idPersona: number, persona: Persona): Observable<Persona>{
    return this.httpClient.put<Persona>(`${this.urlBase}/${idPersona}`, persona)
  }

  eliminarPersona(idPersona: number): Observable<Persona>{
    return this.httpClient.delete<Persona>(`${this.urlBase}/${idPersona}`);
  }
}
