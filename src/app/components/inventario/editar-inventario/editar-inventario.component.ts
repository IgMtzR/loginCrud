import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inventario } from 'src/app/models/Inventario';
import { InventarioService } from 'src/app/service/inventario.service';

@Component({
  selector: 'app-editar-inventario',
  templateUrl: './editar-inventario.component.html',
  styleUrls: ['./editar-inventario.component.css']
})
export class EditarInventarioComponent implements OnInit {

  inventario: Inventario={
    id: null,
    codigo: "",
    tipo: "",
    descripcion: "",
    estado: "",
    departamento: ""
  }
  constructor(private inventarioService: InventarioService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.inventarioService.getOne(id).subscribe(
      data=>{
       this.inventario = data
       console.log(this.inventario)
      },
      err=>{
        this.toastr.error(err.error.msg, "Error",{
          timeOut:3000, positionClass:'toast-top-center'
        });
      }
    )
  }

  updateInventario(){
    this.inventarioService.update(this.inventario.id, this.inventario).subscribe(
      data=>{
        this.toastr.success("Inventario actualizado", "Exito",{
          timeOut:3000, positionClass:'toast-top-center'
        });
        this.router.navigate(['/LoginCrud/inventarios/List'])
      },
      err=>{
        this.toastr.error(err.error.msg, "Error",{
          timeOut:3000, positionClass:'toast-top-center'
        });
      }
    )
  }

}
