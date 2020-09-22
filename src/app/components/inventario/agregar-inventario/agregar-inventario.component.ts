import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inventario } from 'src/app/models/Inventario';
import { InventarioService } from 'src/app/service/inventario.service';

@Component({
  selector: 'app-agregar-inventario',
  templateUrl: './agregar-inventario.component.html',
  styleUrls: ['./agregar-inventario.component.css']
})
export class AgregarInventarioComponent implements OnInit {

  inventario: Inventario={
    id: null,
    codigo: "",
    tipo: "",
    descripcion: "",
    estado: "",
    departamento: ""
  }
  constructor(private inventarioService: InventarioService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }

  addInventario(){
    this.inventarioService.save(this.inventario).subscribe(
      data=>{
        this.toastr.success("Inventario Creado", "Exito",{
          timeOut:3000, positionClass:'toast-top-center'
        });
        this.router.navigate(['/LoginCrud/inventarios/List'])
      },
      err=>{
        if(err.error.msg==null){
          this.toastr.error("Solo Privilegios: Administrador o Desarrollador", "No estas Autorizado",{
            timeOut:3000, positionClass:'toast-top-center'
          });
        }else{
          this.toastr.error(err.error.msg, "Error",{
            timeOut:3000, positionClass:'toast-top-center'
          });
        }
      }
    )
  }

}
