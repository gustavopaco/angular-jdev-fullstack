import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isUserLogged()) {
      const authenticatedRequest = request.clone({setHeaders: {"Authorization": this.authService.getFullToken()}})
      // return next.handle(authenticatedRequest).pipe(catchError(this.processaError));
      return next.handle(authenticatedRequest);
    }
    // return next.handle(request).pipe(catchError(this.processaError));
    return next.handle(request);
  }

  processaError(error: HttpErrorResponse) {
    let message = 'Erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      console.log(error.error)
      message = error.error.message;
    } else {
      message = error.error.message;
    }
    return throwError(message);
  }
}
