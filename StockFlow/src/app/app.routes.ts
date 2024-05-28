import { ProductListComponent } from './components/product-list/product-list.component';
import { Routes } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'stockflow', component: NavbarComponent, canActivate: [authGuard], children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'produtos', children: [
            { path: 'listar', component: ProductListComponent },
            { path: 'cadastrar', component: ProductRegisterComponent },
            { path: 'editar/:id', component: EditProductComponent }
        ] },
    ]},
    { path: 'login', component: LoginComponent }
];
