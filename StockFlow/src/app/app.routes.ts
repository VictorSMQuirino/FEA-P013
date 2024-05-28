import { ProductListComponent } from './components/product-list/product-list.component';
import { Routes } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

export const routes: Routes = [
    { path: '', redirectTo: 'stockflow', pathMatch: 'full' },
    { path: 'stockflow', component: NavbarComponent, children: [
        { path: 'produtos', children: [
            { path: 'listar', component: ProductListComponent },
            { path: 'cadastrar', component: ProductRegisterComponent },
            { path: 'editar/:id', component: EditProductComponent }
        ] },
    ]}
];
