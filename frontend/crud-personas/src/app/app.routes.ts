import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing';
import { LoginComponent } from './components/login/login';
import { MenuComponent } from './components/menu/menu';
import { PersonaComponent } from './components/persona/persona';
import { ProtocolosComponent } from './components/protocolos/protocolos';
import { IncidentesComponent } from './components/incidentes/incidentes'; // <- Agregar arriba

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'menu', component: MenuComponent },
  { path: 'personas', component: PersonaComponent }, 
  { path: 'protocolos', component: ProtocolosComponent },
  { path: 'incidentes', component: IncidentesComponent }, // <- Nueva línea
  { path: '**', redirectTo: '' } 
];