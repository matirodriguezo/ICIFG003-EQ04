import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incidente } from '../models/incidente';

@Injectable({ providedIn: 'root' })
export class IncidenteService {
  private url = 'http://localhost:8884/api/v1/incidentes/';
  constructor(private http: HttpClient) { }
  
  getIncidentes(): Observable<Incidente[]> { return this.http.get<Incidente[]>(this.url); }
  crearIncidente(i: Incidente): Observable<Incidente> { return this.http.post<Incidente>(this.url, i); }
}