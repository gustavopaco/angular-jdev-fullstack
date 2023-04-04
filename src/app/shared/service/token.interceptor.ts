import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "./auth.service";
import {HttpValidator} from "../validator/http-validator";
import {ToastMessageService} from "../external/ngx-toastr/toast-message.service";
import {EXPIRED_JWT_EXCEPTION, EXPIRED_JWT_EXCEPTION_MESSAGE} from "../constant/constants";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private toastMessageService: ToastMessageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isUserLogged()) {
      const authenticatedRequest = request.clone({setHeaders: {"Authorization": this.authService.getFullToken()}})
      return next.handle(authenticatedRequest).pipe(catchError((error: HttpErrorResponse) => this.interceptInvalidToken(error)));
    }
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => this.interceptErrors(error)));
  }

  interceptInvalidToken(error: HttpErrorResponse) {
    if (error.status === 401 && error.error?.message === EXPIRED_JWT_EXCEPTION) {
      this.authService.invalidateSession();
      this.toastMessageService.errorMessage(EXPIRED_JWT_EXCEPTION_MESSAGE);
    } else {
      this.interceptErrors(error);
    }
    return throwError(() => error);
  }

  interceptErrors(error: HttpErrorResponse) {
    this.toastMessageService.errorMessage(HttpValidator.validateResponseErrorMessage(error))
    return throwError(() => error);
  }
}
