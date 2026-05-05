import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../models/persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {

  // Asegúrate de que la URL termine en "/" para que al concatenar el ID quede bien (ej: .../persona/5)
  private apiUrl = 'http://localhost:8884/api/v1/entities/persona/';

  constructor(private http: HttpClient) {}

  // GET (READ)
  getPersonasHttp(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  // POST (CREATE)
  crearPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona);
  }

  // PUT (UPDATE)
  actualizarPersona(id: number, persona: Persona): Observable<Persona> {
    // CORRECCIÓN: Uso de comillas invertidas (backticks)
    return this.http.put<Persona>(`${this.apiUrl}${id}`, persona);
  }

  // DELETE
  eliminarPersona(id: number): Observable<void> {
    // CORRECCIÓN: Uso de comillas invertidas (backticks)
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}