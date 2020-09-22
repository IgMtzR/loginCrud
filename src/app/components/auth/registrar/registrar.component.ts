import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/Login';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  isRegister = false;
  isLogged = false;
  isRegisterFail = false;
  rol: string
  newUser: Usuario={
    nombre: "",
    nombreusuario: "",
    email: "",
    password: "",
    roles: []
  };
  Msg:string;z
  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
  }

  onRegister(){
    this.newUser.roles.push(this.rol)
    this.authService.addUser(this.newUser).subscribe(
      data=>{
        this.toastr.success("Cuenta creada", "Exito",{
          timeOut:3000, positionClass:'toast-top-center'
        });
       
        this.router.navigate(['/LoginCrud/Auth/Login']);  
      },
      err=>{
        this.isRegister = false
        this.isRegister = true
        if(err.error.msg==null){
          this.toastr.error("Credenciales incorrectas", "Error",{
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
