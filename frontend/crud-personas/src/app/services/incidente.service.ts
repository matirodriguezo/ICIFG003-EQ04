import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incidente } from '../models/incidente';

@Injectable({ providedIn: 'root' })
export class IncidenteService {
  
  // Variable definida estrictamente como "url"
  private url = 'http://localhost:8884/api/v1/incidentes/';
  
  constructor(private http: HttpClient) { }
  
  getIncidentes(): Observable<Incidente[]> { 
    return this.http.get<Incidente[]>(this.url); 
  }
  
  crearIncidente(i: Incidente): Observable<Incidente> { 
    return this.http.post<Incidente>(this.url, i); 
  }
  
  // UPDATE Lógico (Anular/Modificar) - CORREGIDO
  actualizarIncidente(id: number, incidente: Incidente): Observable<Incidente> {
    // Se reemplazó this.apiUrl por this.url para que coincida con la variable superior
    return this.http.put<Incidente>(`${this.url}${id}`, incidente);
  }
}