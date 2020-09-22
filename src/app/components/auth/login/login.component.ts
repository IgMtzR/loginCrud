import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/Login';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  isLogged = false;
  isLoginFail = false;
  login: Login={
    nombreUsuario: "",
    password: ""
  };
  roles: string[]=[];
  Msg:string;

  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
   this.verifyLogin();
  }

  verifyLogin(){
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAutorities();
    }
  }
  onLogin(){
    this.authService.LoginUser(this.login).subscribe(
      data=>{
        this.isLogged = true;//almacenaje en local
        this.isLoginFail = false;//almacenaje en local
        this.tokenService.setToken(data.token);//almacenaje en sesionstorage
        this.tokenService.setUserName(data.nombreUsuario);//almacenaje en sesionstorage
        this.tokenService.setAuthorities(data.authorities);//almacenaje en sesionstorage
        this.roles = data.authorities//almacenaje en local
        this.router.navigate(['/']);  
      },
      err=>{
        if(err.error.msg==null){
          this.toastr.error("Error en el Login / Credenciales incorrectas", "Error",{
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
