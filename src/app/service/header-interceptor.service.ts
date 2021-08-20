import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

// @Injectable({
// providedIn: 'root'
// })
export class HeaderInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem("token") !== null) {
      const token = `Bearer ${localStorage.getItem("token")}`;
      const tokenRequest = request.clone({
        headers: request.headers.set("Authorization", token)
      });
      return next.handle(tokenRequest);
    } else {
      return next.handle(request);
    }
  }
}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true
  },
  ],
})

export class HttpInterceptorModule {

}
