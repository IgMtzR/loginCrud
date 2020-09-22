import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';

const TOKEN_KEY = "AuthToken";
const USERNAME_KEY = "AuthUserName";
const AUTHORITIES_KEY = "authAuthorities";
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string>=[];
  
  constructor() { }

  setToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  getToken(): string{
    return sessionStorage.getItem(TOKEN_KEY);
  }
  setUserName(username: string): void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
  getUsername(): string{
    return sessionStorage.getItem(USERNAME_KEY)
  }
  setAuthorities(authorities: string[]):void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }
  getAutorities(): string[]{
    this.roles = [];
    if(sessionStorage.getItem(AUTHORITIES_KEY)){
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach( authority=> {
        this.roles.push(authority.authority)
      });
    }
    return this.roles;
  }
  public logOut(): void{
    window.sessionStorage.clear();
  }

}
