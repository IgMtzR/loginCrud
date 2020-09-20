import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AgregarInventarioComponent } from './components/inventario/agregar-inventario/agregar-inventario.component';
import { EditarInventarioComponent } from './components/inventario/editar-inventario/editar-inventario.component';
import { ListaInventariosComponent } from './components/inventario/lista-inventarios/lista-inventarios.component';

const routes: Routes = [
  {
    path: "LoginCrud/inventarios/List",
    component: ListaInventariosComponent
  },
  {
    path: "LoginCrud/inventarios/Add",
    component: AgregarInventarioComponent
  },
  {
    path: "LoginCrud/inventarios/Edit/:id",
    component: EditarInventarioComponent
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
