import { Routes } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'stockflow', component: NavbarComponent, children: [
        
    ]}
];
