import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem("token") !== null) {
      const token = `Bearer ${localStorage.getItem("token")}`

      const cloned = request.clone({
      headers : request.headers.set("Authorization", token)
        // .set("Access-Control-Allow-Origin","*").set("Access-Control-Allow-Headers","*").set("Access-Control-Allow-Methods", "*") /* Habilitar em caso de necessidade*/
      });
      return next.handle(cloned)/*.pipe(tap((event : HttpEvent<any>) => {
        if (event instanceof HttpResponse && (event.status === 200 || event.status === 204)) {
          console.log("Sucesso na operacao");
        }
      }), catchError(this.errorHandling));*/
    } else {
      return next.handle(request)/*.pipe(catchError(this.errorHandling))*/;
    }
  }
  /*  IMPORTANT: Caso queria que o interceptador lide com erros automaticamente, descomentar tudo abaixo e acima */
  // public errorHandling(error : HttpErrorResponse) {
  //   let errorMessage: string;
  //   if (error.error instanceof ErrorEvent) {
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     errorMessage = `Mensagem: ${error.error.message} \nStatus: ${error.error.status}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }
}
