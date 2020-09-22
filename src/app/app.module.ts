import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


//**************modulos agregados************** 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
//*********************************************

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListaInventariosComponent } from './components/inventario/lista-inventarios/lista-inventarios.component';
import { AgregarInventarioComponent } from './components/inventario/agregar-inventario/agregar-inventario.component';
import { EditarInventarioComponent } from './components/inventario/editar-inventario/editar-inventario.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrarComponent } from './components/auth/registrar/registrar.component';
import { MenuComponent } from './components/comunes/menu/menu.component';
import { tokenizar } from './service/intermediary.service';
import { FooterComponent } from './components/comunes/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaInventariosComponent,
    AgregarInventarioComponent,
    EditarInventarioComponent,
    LoginComponent,
    RegistrarComponent,
    MenuComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    DataTablesModule
    
  ],
  providers: [tokenizar],
  bootstrap: [AppComponent]
})
export class AppModule { }
