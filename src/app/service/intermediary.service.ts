import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class IntermediaryService implements HttpInterceptor{

  constructor(private tokenService: TokenService) { }

  intercept(requ: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let varReq =requ;
    const token = this.tokenService.getToken();
    if(token != null){
      varReq = requ.clone(
        {
          headers: varReq.headers.set(
            "Authorization",
            "Bearer " + token
            )
        });
    }
    return next.handle(varReq);
  }


}
export const tokenizar = [{
                            provide : HTTP_INTERCEPTORS, 
                            useClass: IntermediaryService,
                            multi: true
                          }];

