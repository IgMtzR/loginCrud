import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrarComponent } from './components/auth/registrar/registrar.component';
import { HomeComponent } from './components/home/home.component';
import { AgregarInventarioComponent } from './components/inventario/agregar-inventario/agregar-inventario.component';
import { EditarInventarioComponent } from './components/inventario/editar-inventario/editar-inventario.component';
import { ListaInventariosComponent } from './components/inventario/lista-inventarios/lista-inventarios.component';
import { InventarioGuardGuard } from './guards/inventario-guard.guard';

const routes: Routes = [
  {
    path: "LoginCrud/inventarios/List",
    component: ListaInventariosComponent,
    canActivate: [InventarioGuardGuard], data: { expectedRol: ['admin', 'developer', 'user'] }
  },
  {
    path: "LoginCrud/inventarios/Add",
    component: AgregarInventarioComponent,
    canActivate: [InventarioGuardGuard], data: { expectedRol: ['admin', 'developer'] }
  },
  {
    path: "LoginCrud/inventarios/Edit/:id",
    component: EditarInventarioComponent,
    canActivate: [InventarioGuardGuard], data: { expectedRol: ['admin', 'developer'] }
  },
  {
    path: "LoginCrud/Auth/Login",
    component: LoginComponent
  },
  {
    path: "LoginCrud/Auth/Register",
    component: RegistrarComponent
  },
  {
    path:'LoginCrud',
    component: HomeComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/LoginCrud"
  },
  {
    path: "**",
    redirectTo: "/LoginCrud"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
