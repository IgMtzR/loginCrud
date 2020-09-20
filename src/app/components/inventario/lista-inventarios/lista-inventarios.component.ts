import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Inventario } from 'src/app/models/Inventario';
import { InventarioService } from 'src/app/service/inventario.service';

@Component({
  selector: 'app-lista-inventarios',
  templateUrl: './lista-inventarios.component.html',
  styleUrls: ['./lista-inventarios.component.css']
})
export class ListaInventariosComponent implements OnInit {

  inventarios: Inventario[];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  
  constructor(private inventarioService: InventarioService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataConfig()
    this.getAll();
    
    
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
        this.toastr.error(err.error.msg, "Error",{
          timeOut:3000, positionClass:'toast-top-center'
        });
      }
    )
  }


}
