import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Protocolo } from '../models/protocolo';

@Injectable({
  providedIn: 'root'
})
export class ProtocoloService {
  private url = 'http://localhost:8884/api/v1/protocolos/';

  constructor(private http: HttpClient) { }

  getProtocolos(): Observable<Protocolo[]> { return this.http.get<Protocolo[]>(this.url); }
  crearProtocolo(p: Protocolo): Observable<Protocolo> { return this.http.post<Protocolo>(this.url, p); }
  actualizarProtocolo(id: number, p: Protocolo): Observable<Protocolo> { return this.http.put<Protocolo>(this.url + id, p); }
  eliminarProtocolo(id: number): Observable<any> { return this.http.delete(this.url + id); }
}