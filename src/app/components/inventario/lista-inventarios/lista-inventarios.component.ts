import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Inventario } from 'src/app/models/Inventario';
import { InventarioService } from 'src/app/service/inventario.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-lista-inventarios',
  templateUrl: './lista-inventarios.component.html',
  styleUrls: ['./lista-inventarios.component.css']
})
export class ListaInventariosComponent implements OnInit {

  inventarios: Inventario[];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  roles: string[];
  isUser = true;
  
  constructor(private inventarioService: InventarioService,
              private toastr: ToastrService,
              private router: Router,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.dataConfig()
    this.getAll();
    this.roles = this.tokenService.getAutorities(); 
    this.roles.forEach(rol=>{
      if(rol == "ROLE_ADMIN" || rol == "ROLE_DEVELOPER"){
        this.isUser = false;
      }
    })   
  }
  dataConfig(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      info: true,
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        }
      }
    }
  }

  getAll(){
    this.inventarioService.getAll().subscribe(
      data=>{
        
        this.inventarios = data
        this.dtTrigger.next()
      }
    )
  }

  deleteInventario(id: number|string){
    this.inventarioService.delete(id).subscribe(
      data=>{
        this.toastr.success("Inventario Eliminado", "Exito",{
          timeOut:3000, positionClass:'toast-top-center'
        });
        $('#tInventarios').DataTable().destroy()
          this.getAll()
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
