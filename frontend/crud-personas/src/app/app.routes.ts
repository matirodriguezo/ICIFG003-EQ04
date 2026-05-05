import { Routes } from '@angular/router';
import { PersonaComponent } from './components/persona/persona';
import { LandingComponent } from './components/landing/landing';
import { LoginComponent } from './components/login/login';
import { MenuComponent } from './components/menu/menu'; // <-- Importamos el menú

export const routes: Routes = [
    { path: '', component: LandingComponent }, 
    { path: 'login', component: LoginComponent }, 
    { path: 'menu', component: MenuComponent }, // <-- Nueva ruta para el menú
    { path: 'crud-personas', component: PersonaComponent } 
];