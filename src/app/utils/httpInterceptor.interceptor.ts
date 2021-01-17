import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';

export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user = localStorage.getItem('user');
    let userObject = { token: 'abc' };
    let token = userObject.token;
    if (user) {
      userObject = JSON.parse(user);
      token = userObject.token;
    }
    const new_req = req.clone({
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'authorization': `Bearer ${token}` }),
    });
    return next.handle(new_req)
  }
}
